import { BaseDto } from "src/shared/application/dtos/base/base.dto";
import { IsNumber, IsPositive, IsString, Length } from "class-validator";
import { Expose } from "class-transformer";

export class WalletUpdateAPIRequestDto extends BaseDto<WalletUpdateAPIRequestDto> {
    @IsNumber()
    @IsPositive()
    @Expose()
    user_id: number;
    @IsNumber()
    @IsPositive()
    @Expose()
    bank_id: number;
}
