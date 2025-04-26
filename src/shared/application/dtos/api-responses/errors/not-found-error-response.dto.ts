import { HttpStatus } from "@nestjs/common";
import { ApiResponseDto } from "../api-response.dto";

/**
 * Representa una respuesta errores x inexistencia de la API (código 404)
 */
export class NotFoundResponse extends ApiResponseDto<void, void> {
    /**
     * Crea una nueva instancia de respuesta NotFound
     * @param message Mensaje descriptivo del error
     * @param item Datos a retornar (opcional)
     */
    constructor(message: string) {
        // Usa el método protegido de la clase padre para crear la instancia
        super(HttpStatus.NOT_FOUND, message);
    }
}
