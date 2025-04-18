import { HttpStatus } from "@nestjs/common";
import { ApiResponseDto } from "../api-response.dto";

/**
 * Representa una respuesta errores x conflicto de la API (código 409)
 */
export class ConflictResponse extends ApiResponseDto {
    /**
     * Crea una nueva instancia de respuesta Conflict
     * @param message Mensaje descriptivo del error
     * @param item Datos a retornar (opcional)
     */
    constructor(message: string, item?: any, error?: any) {
        // Usa el método protegido de la clase padre para crear la instancia
        super(HttpStatus.CONFLICT, message, item, error);
    }
}
