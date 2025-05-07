/**
 * DTO para la creación de tipos de identificación
 */
export class IdentificationTypeCreateDatabaseDto {
    /**
     * Nombre del tipo de identificación
     * @example "Cédula de Ciudadanía"
     */
    name: string;

    /**
     * Código del tipo de identificación
     * @example "CC"
     */
    code: string;
}
