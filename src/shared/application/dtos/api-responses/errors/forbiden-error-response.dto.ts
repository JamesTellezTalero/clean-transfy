import { HttpStatus } from "@nestjs/common";
import { ApiResponseDto } from "../api-response.dto";

/**
 * Representa una respuesta errores x permisos de la API (código 403)
 */
export class ForbidenResponse extends ApiResponseDto<void, void> {
    /**
     * Crea una nueva instancia de respuesta Forbiden
     * @param message Mensaje descriptivo del error
     * @param item Datos a retornar (opcional)
     */
    constructor(message: string) {
        // Usa el método protegido de la clase padre para crear la instancia
        super(HttpStatus.FORBIDDEN, message);
    }
}
