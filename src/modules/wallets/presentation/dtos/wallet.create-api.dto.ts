import { ApiProperty } from "@nestjs/swagger";
import { Expose } from "class-transformer";
import { IsNotEmpty, IsNumber, IsPositive, IsString } from "class-validator";
import { BaseDto } from "src/shared/application/dtos/base/base.dto";

/**
 * DTO para la creación de una nueva billetera (Wallet).
 */
export class WalletCreateAPIRequestDto extends BaseDto<WalletCreateAPIRequestDto> {
    /**
     * UUID del usuario asociado con la billetera.
     * @example "a9f8d1c5-72c4-4d5a-9a2b-6cd7bc4c6a51"
     */
    @ApiProperty({
        name: "user_uuid",
        type: "string",
        description: "UUID of the user associated with the wallet"
    })
    @IsString()
    @IsNotEmpty()
    @Expose()
    user_uuid: string;

    /**
     * ID del usuario asociado con la billetera.
     * @example 1
     */
    @Expose()
    user_id: number;

    /**
     * ID del banco relacionado con la billetera.
     * @example 2
     */
    @ApiProperty({
        name: "bank_id",
        type: "number",
        description: "ID of the bank associated with the wallet"
    })
    @IsNumber()
    @IsPositive()
    @Expose()
    bank_id: number;
}
