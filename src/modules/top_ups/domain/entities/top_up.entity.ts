import { ApiProperty } from "@nestjs/swagger";

/**
 * Entidad que representa un recargo o abono en una billetera.
 */
export class TopUp {
    /**
     * Identificador único del recargo.
     * @example 1
     */
    @ApiProperty({ name: "id", type: "number", example: 1 })
    id: number;

    /**
     * Identificador único de la billetera asociada al recargo.
     * @example 123
     */
    @ApiProperty({ name: "wallet_id", type: "number", example: 123 })
    wallet_id: number;

    /**
     * Monto del recargo o abono realizado.
     * @example 500
     */
    @ApiProperty({ name: "amount", type: "number", example: 500 })
    amount: number;

    /**
     * Fecha de creación del recargo o abono.
     * @example "2023-05-01T12:00:00Z"
     */
    @ApiProperty({
        name: "created_at",
        type: "string",
        format: "date-time",
        example: "2023-05-01T12:00:00Z"
    })
    created_at: Date;

    /**
     * Fecha de última actualización del recargo o abono.
     * @example "2023-06-01T12:00:00Z"
     */
    @ApiProperty({
        name: "updated_at",
        type: "string",
        format: "date-time",
        example: "2023-06-01T12:00:00Z"
    })
    updated_at: Date;
}
