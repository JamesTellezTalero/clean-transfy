import { Expose } from "class-transformer";
import {
    IsNotEmpty,
    IsNumber,
    IsPositive,
    IsString,
    Length
} from "class-validator";
import { BaseDto } from "src/shared/application/dtos/base/base.dto";

export class WalletCreateAPIRequestDto extends BaseDto<WalletCreateAPIRequestDto> {
    @IsString()
    @IsNotEmpty()
    @Expose()
    user_uuid: string;
    @Expose()
    user_id: number;
    @IsNumber()
    @IsPositive()
    @Expose()
    bank_id: number;
}
