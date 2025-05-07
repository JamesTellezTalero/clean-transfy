import { ApiProperty } from "@nestjs/swagger";

/**
 * Entidad primitiva que representa una billetera de usuario.
 */
export class Wallet {
    /**
     * Identificador único de la billetera.
     */
    @ApiProperty({ name: "id", type: "number" })
    id: number;

    /**
     * UUID único de la billetera.
     */
    @ApiProperty({ name: "uuid", type: "string" })
    uuid: string;

    /**
     * ID del usuario asociado a la billetera.
     */
    @ApiProperty({ name: "user_id", type: "number" })
    user_id: number;

    /**
     * ID del banco asociado a la billetera.
     */
    @ApiProperty({ name: "bank_id", type: "number" })
    bank_id: number;

    /**
     * Saldo actual de la billetera.
     */
    @ApiProperty({ name: "balance", type: "number" })
    balance: number;

    /**
     * Estado de la billetera (activa o inactiva).
     */
    @ApiProperty({ name: "status", type: "boolean" })
    status: boolean;

    /**
     * Fecha de creación de la billetera.
     */
    @ApiProperty({ name: "created_at", type: "string", format: "date-time" })
    created_at: Date;

    /**
     * Fecha de última actualización de la billetera.
     */
    @ApiProperty({ name: "updated_at", type: "string", format: "date-time" })
    updated_at: Date;
}
