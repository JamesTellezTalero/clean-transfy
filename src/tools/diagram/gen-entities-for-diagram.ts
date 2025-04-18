import fs from "fs";
import path from "path";

function cleanEntityContent(content: string): string {
    // More robust content cleaning
    const cleanedContent = content
        .replace(/import\s+{[\s\S]?}\s+from\s+['"].?['"];\n/g, "") // Remove import statements
        .replace(/export\s+/, "") // Remove export keyword
        .trim();

    return cleanedContent;
}

function mergeEntities(folderPath: string, outputPath: string) {
    let mergedContent =
        'import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";\n\n';

    const files = fs
        .readdirSync(folderPath)
        .filter((file) => file.endsWith(".ts") && !file.includes(".spec.ts"));

    files.forEach((file) => {
        const filePath = path.join(folderPath, file);
        const content = fs.readFileSync(filePath, "utf-8");

        try {
            const cleanedContent = cleanEntityContent(content);
            mergedContent += `// From ${file}\n${cleanedContent}\n\n`;
        } catch (error) {
            console.error(`Error processing file ${file}:`, error);
        }
    });

    fs.writeFileSync(outputPath, mergedContent, "utf-8");
    console.log(`Merged entities saved to: ${outputPath}`);
}

// Usage example
const entitiesFolder = path.join(__dirname, "../database/entities");
const outputFile = path.join(__dirname, "mergedEntities.ts");

console.log("entitiesFolder: ", entitiesFolder);
console.log("=================================");
console.log("outputFile: ", outputFile);
console.log("=================================");
try {
    mergeEntities(entitiesFolder, outputFile);
} catch (error) {
    console.log("error generating entities for Diagram");
    console.log(error);
}
