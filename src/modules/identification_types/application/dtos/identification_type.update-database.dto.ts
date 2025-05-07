/**
 * DTO para la actualización de tipos de identificación
 */
export class IdentificationTypeUpdateDatabaseDto {
    /**
     * Nombre del tipo de identificación
     * @example "Tarjeta de Identidad"
     */
    name: string;

    /**
     * Código del tipo de identificación
     * @example "TI"
     */
    code: string;
}
