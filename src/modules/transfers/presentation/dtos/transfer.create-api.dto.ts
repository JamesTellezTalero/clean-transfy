import { ApiProperty } from "@nestjs/swagger";
import { Expose, Type } from "class-transformer";
import { IsNotEmpty, IsNumber, IsPositive, IsUUID } from "class-validator";
import { BaseDto } from "src/shared/application/dtos/base/base.dto";

/**
 * DTO utilizado para recibir datos desde la API al momento de realizar una transferencia de saldo.
 *
 * Extiende `BaseDto` para la inicialización, sanitización y validación automática de propiedades.
 */
export class TransferCreateAPIRequestDto extends BaseDto<TransferCreateAPIRequestDto> {
    /**
     * UUID del usuario que está realizando la transferencia.
     * @example "a07327e0-d82a-11eb-b8bc-0242ac130003"
     */
    @ApiProperty({
        name: "user_uuid",
        type: "string",
        description: "UUID of the user initiating the transfer"
    })
    @IsUUID()
    @IsNotEmpty()
    @Expose()
    user_uuid: string;

    /**
     * UUID de la billetera desde la cual se realiza la transferencia.
     * @example "b4f82b7a-d82a-11eb-b8bc-0242ac130003"
     */
    @ApiProperty({
        name: "source_wallet_uuid",
        type: "string",
        description: "UUID of the source wallet"
    })
    @IsUUID()
    @IsNotEmpty()
    @Expose()
    source_wallet_uuid: string;

    /**
     * UUID de la billetera a la cual se recibe la transferencia.
     * @example "c8f93c5b-d82a-11eb-b8bc-0242ac130004"
     */
    @ApiProperty({
        name: "target_wallet_uuid",
        type: "string",
        description: "UUID of the target wallet"
    })
    @IsUUID()
    @IsNotEmpty()
    @Expose()
    target_wallet_uuid: string;

    /**
     * Monto a transferir..
     * Solo se permiten números positivos sin decimales.
     * @example 5000
     */
    @ApiProperty({
        name: "amount",
        type: "number",
        description: "Amount to be transferred"
    })
    @IsNumber()
    @IsPositive()
    @IsNotEmpty()
    @Type(() => Number)
    @Expose()
    amount: number;
}
