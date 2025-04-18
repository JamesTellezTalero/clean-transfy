import fs from "fs";
import path from "path";

function cleanEntityContent(content: string): string {
    return content.split('from "typeorm";')[1].trim();
}

function getCleanEntityImportsContent(content: string): string {
    const decoratorRegex = /@[\w]+/g;
    let matches = Array.from(content.match(decoratorRegex)); // Cambiar a Array para evitar valores nulos, ademas de procesar el contenido con la expresion regular

    matches = matches.map((match) => match.replace(/@/g, "")); // Eliminar el símbolo @

    const uniqueMatches = Array.from(new Set(matches)); // Eliminar duplicados

    const importSentences = `import { ${uniqueMatches.join(", ")} } from "typeorm";\n\n`;
    return importSentences;
}

// Busca recursivamente archivos que terminen en orm-entity.ts
function findEntityFilesRecursively(dir: string): string[] {
    let results: string[] = [];
    const list = fs.readdirSync(dir);

    list.forEach((file) => {
        const filePath = path.join(dir, file);
        const stat = fs.statSync(filePath);

        if (stat && stat.isDirectory()) {
            results = results.concat(findEntityFilesRecursively(filePath));
        } else if (file.endsWith("orm-entity.ts")) {
            results.push(filePath);
        }
    });

    return results;
}

function mergeEntities(folderPath: string, outputPath: string) {
    let mergedContent = "";

    const files = findEntityFilesRecursively(folderPath);

    files.forEach((filePath) => {
        const content = fs.readFileSync(filePath, "utf-8");

        try {
            const cleanedContent = cleanEntityContent(content);
            const fileName = path.basename(filePath);
            mergedContent += `// From ${fileName}\n${cleanedContent}\n\n`;
        } catch (error) {
            console.error(`Error processing file ${filePath}:`, error);
        }
    });

    const contentImports = getCleanEntityImportsContent(mergedContent);

    fs.writeFileSync(outputPath, contentImports + mergedContent, "utf-8");
    console.log(`Merged entities saved to: ${outputPath}`);
}

// Uso del script
const entitiesFolder = path.join(__dirname, "../../modules");
const outputFile = path.join(__dirname, "mergedEntities.ts");

console.log("Buscando entidades en:", entitiesFolder);
console.log("=================================");
console.log("Archivo de salida:", outputFile);
console.log("=================================");
try {
    mergeEntities(entitiesFolder, outputFile);
} catch (error) {
    console.log("Error generando entidades para el diagrama:");
    console.log(error);
}
