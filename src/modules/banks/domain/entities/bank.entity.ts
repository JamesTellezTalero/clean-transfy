import { ApiProperty } from "@nestjs/swagger";

/**
 * Entidad primitiva que representa un banco.
 */
export class Bank {
    /**
     * Identificador único del banco.
     */
    @ApiProperty({ description: "id", type: "number" })
    id: number;

    /**
     * nombre del banco.
     */
    @ApiProperty({ description: "name", type: "string" })
    name: string;

    /**
     * codigo único del banco.
     */
    @ApiProperty({ description: "code", type: "string" })
    code: string;

    /**
     * estado del banco.
     */
    @ApiProperty({ description: "status", type: "boolean" })
    status: boolean;

    /**
     * fecha de creacion del banco.
     */
    @ApiProperty({ description: "create date", type: "string" })
    created_at: Date;

    /**
     * fecha de actualizacion del banco.
     */
    @ApiProperty({ description: "update date", type: "string" })
    updated_at: Date;
}
