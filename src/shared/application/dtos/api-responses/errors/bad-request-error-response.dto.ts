import { HttpStatus } from "@nestjs/common";
import { ApiResponseDto } from "../api-response.dto";

/**
 * Representa una respuesta errores x mal formacion en el body de la API (código 400)
 */
export class BadRequestResponse<Error> extends ApiResponseDto<void, Error> {
    /**
     * Crea una nueva instancia de respuesta BadRequest
     * @param message Mensaje descriptivo del error
     * @param item Datos a retornar (opcional)
     */
    constructor(message: string, error?: Error) {
        // Usa el método protegido de la clase padre para crear la instancia
        super(HttpStatus.BAD_REQUEST, message, null, error);
    }
}
