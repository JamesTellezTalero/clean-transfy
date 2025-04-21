import { Expose } from "class-transformer";
import { IsNumber, IsPositive, IsString, Length } from "class-validator";
import { BaseDto } from "src/shared/application/dtos/base/base.dto";

export class WalletCreateAPIRequestDto extends BaseDto<WalletCreateAPIRequestDto> {
    @IsNumber()
    @IsPositive()
    @Expose()
    user_id: number;
    @IsNumber()
    @IsPositive()
    @Expose()
    bank_id: number;
}
