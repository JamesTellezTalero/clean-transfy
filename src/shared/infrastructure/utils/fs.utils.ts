import * as fs from "fs/promises";
import { ApiResponseDto } from "../application/dtos/api-responses/api-response.dto";
import { HttpStatus } from "@nestjs/common";
import { ConflictResponse } from "../application/dtos/api-responses/errors/conflict-error-response.dto";

export class FSUtils {
    // Método privado para limpiar archivo
    static async cleanupExcelFile(filePath: string) {
        try {
            // Verificar si el archivo existe antes de intentar eliminarlo
            await fs.access(filePath);
            await fs.unlink(filePath);
            console.log(`Archivo temporal eliminado: ${filePath}`);
        } catch (error) {
            // Manejar casos donde el archivo ya no existe o no se puede eliminar
            console.error(
                `Error al eliminar archivo temporal: ${error.message}`
            );
            throw new ConflictResponse(
                "Error al eliminar archivo temporal",
                error
            );
        }
    }
}
