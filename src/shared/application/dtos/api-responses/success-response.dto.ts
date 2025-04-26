import { HttpStatus } from "@nestjs/common";
import { ApiResponseDto } from "./api-response.dto";

/**
 * Representa una respuesta exitosa de la API (código 200)
 */
export class SuccessResponse<Item, Error> extends ApiResponseDto<Item, Error> {
    /**
     * Crea una nueva instancia de respuesta exitosa
     * @param message Mensaje descriptivo del éxito
     * @param item Datos a retornar (opcional)
     */
    constructor(message: string, item?: Item) {
        // Usa el método protegido de la clase padre para crear la instancia
        super(HttpStatus.OK, message, item, null);
    }
}
