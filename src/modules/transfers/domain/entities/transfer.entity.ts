import { ApiProperty } from "@nestjs/swagger";

/**
 * Entidad que representa una transferencia entre dos billeteras.
 */
export class Transfer {
    /**
     * Identificador único de la transferencia.
     * @example 1
     */
    @ApiProperty({ name: "id", type: "number", example: 1 })
    id: number;

    /**
     * Identificador único de la billetera fuente.
     * @example 101
     */
    @ApiProperty({ name: "source_wallet_id", type: "number", example: 101 })
    source_wallet_id: number;

    /**
     * Identificador único de la billetera destino.
     * @example 102
     */
    @ApiProperty({ name: "target_wallet_id", type: "number", example: 102 })
    target_wallet_id: number;

    /**
     * Monto de la transferencia.
     * @example 1000
     */
    @ApiProperty({ name: "amount", type: "number", example: 1000 })
    amount: number;

    /**
     * Fecha en la que se realizó la transferencia.
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
     * Fecha de la última actualización de la transferencia.
     * @example "2023-05-01T12:30:00Z"
     */
    @ApiProperty({
        name: "updated_at",
        type: "string",
        format: "date-time",
        example: "2023-05-01T12:30:00Z"
    })
    updated_at: Date;
}
