import { HttpStatus } from "@nestjs/common";
import { ApiResponseDto } from "../api-response.dto";

/**
 * Representa una respuesta errores ointernos de servicio de la API (código 500)
 */
export class InternalServerErrorResponse extends ApiResponseDto {
    /**
     * Crea una nueva instancia de respuesta InternalServerErrorResponse
     * @param message Mensaje descriptivo del error
     * @param item Datos a retornar (opcional)
     */
    constructor(message: string, item?: any, error?: any) {
        // Usa el método protegido de la clase padre para crear la instancia
        super(HttpStatus.INTERNAL_SERVER_ERROR, message, item, error);
    }
}
