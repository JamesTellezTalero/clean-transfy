import { ApiProperty } from "@nestjs/swagger";
import { Expose, Type } from "class-transformer";
import {
    IsNotEmpty,
    IsNumber,
    IsPositive,
    IsString,
    IsUUID
} from "class-validator";
import { BaseDto } from "src/shared/application/dtos/base/base.dto";

/**
 * DTO utilizado para recibir datos desde la API al momento de realizar una recarga de saldo.
 *
 * Extiende `BaseDto` para la inicialización, sanitización y validación automática de propiedades.
 */
export class TopUpCreateAPIRequestDto extends BaseDto<TopUpCreateAPIRequestDto> {
    /**
     * UUID de la billetera a la cual se le va a recargar el saldo.
     * @example "a07327e0-d82a-11eb-b8bc-0242ac130003"
     */
    @ApiProperty({
        name: "wallet_uuid",
        type: "string",
        description: "Wallet UUID"
    })
    @IsUUID()
    @IsNotEmpty()
    @Expose()
    wallet_uuid: string;

    /**
     * UUID del usuario que solicita la recarga.
     * @example "a07327e0-d82a-11eb-b8bc-0242ac130004"
     */
    @ApiProperty({
        name: "user_uuid",
        type: "string",
        description: "User UUID"
    })
    @IsUUID()
    @IsNotEmpty()
    @Expose()
    user_uuid: string;

    /**
     * Monto a ser recargado en la billetera.
     * Solo se permiten números positivos sin decimales.
     * @example 10000
     */
    @ApiProperty({
        name: "amount",
        type: "number",
        description: "Amount to be added"
    })
    @IsNumber()
    @IsPositive()
    @Type(() => Number)
    @Expose()
    amount: number;
}
