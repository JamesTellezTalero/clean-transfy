import { ApiProperty } from "@nestjs/swagger";

/**
 * Entidad primitiva que representa un tipo de identificación.
 */
export class IdentificationType {
    /**
     * Identificador único del tipo de identificación.
     * @example 1
     */
    @ApiProperty({
        description: "ID único del tipo de identificación",
        type: "number",
        example: 1
    })
    id: number;

    /**
     * Nombre del tipo de identificación.
     * @example "Cédula de ciudadanía"
     */
    @ApiProperty({
        description: "Nombre del tipo de identificación",
        type: "string",
        example: "Cédula de ciudadanía"
    })
    name: string;

    /**
     * Fecha de creación del tipo de identificación.
     * @example "2022-05-01T12:00:00Z"
     */
    @ApiProperty({
        description: "Fecha de creación del tipo de identificación",
        type: "string",
        format: "date-time",
        example: "2022-05-01T12:00:00Z"
    })
    created_at: Date;

    /**
     * Fecha de última actualización del tipo de identificación.
     * @example "2023-04-20T10:15:00Z"
     */
    @ApiProperty({
        description: "Fecha de última actualización del tipo de identificación",
        type: "string",
        format: "date-time",
        example: "2023-04-20T10:15:00Z"
    })
    updated_at: Date;
}
