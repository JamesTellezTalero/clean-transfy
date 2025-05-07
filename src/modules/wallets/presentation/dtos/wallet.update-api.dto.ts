import { BaseDto } from "src/shared/application/dtos/base/base.dto";
import { IsNumber, IsPositive } from "class-validator";
import { Expose } from "class-transformer";
import { ApiProperty } from "@nestjs/swagger";

/**
 * DTO para la actualización de una billetera (Wallet).
 */
export class WalletUpdateAPIRequestDto extends BaseDto<WalletUpdateAPIRequestDto> {
    /**
     * ID del usuario asociado con la billetera.
     * @example 1
     */
    @ApiProperty({
        name: "user_id",
        type: "number",
        description: "ID of the user associated with the wallet"
    })
    @IsNumber()
    @IsPositive()
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
