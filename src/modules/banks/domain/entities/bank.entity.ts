import { ApiProperty } from "@nestjs/swagger";

/**
 * Entidad primitiva que representa un banco.
 */
export class Bank {
    /**
     * Identificador único del banco.
     * @example 1
     */
    @ApiProperty({
        description: "ID único del banco",
        type: "number",
        example: 1
    })
    id: number;

    /**
     * Nombre del banco.
     * @example "Banco de Bogotá"
     */
    @ApiProperty({
        description: "Nombre del banco",
        type: "string",
        example: "Banco de Bogotá"
    })
    name: string;

    /**
     * Código único del banco.
     * @example "BOG"
     */
    @ApiProperty({
        description: "Código único del banco",
        type: "string",
        example: "BOG"
    })
    code: string;

    /**
     * Estado del banco, indica si está activo o inactivo.
     * @example true
     */
    @ApiProperty({
        description: "Estado del banco (activo/inactivo)",
        type: "boolean",
        example: true
    })
    status: boolean;

    /**
     * Fecha de creación del banco.
     * @example "2021-07-15T14:00:00Z"
     */
    @ApiProperty({
        description: "Fecha de creación del banco",
        type: "string",
        format: "date-time",
        example: "2021-07-15T14:00:00Z"
    })
    created_at: Date;

    /**
     * Fecha de última actualización del banco.
     * @example "2023-05-01T10:30:00Z"
     */
    @ApiProperty({
        description: "Fecha de última actualización del banco",
        type: "string",
        format: "date-time",
        example: "2023-05-01T10:30:00Z"
    })
    updated_at: Date;
}
