import { Expose } from "class-transformer";
import {
    IsNotEmpty,
    IsNumber,
    IsPositive,
    IsString,
    Length
} from "class-validator";
import { BaseDto } from "src/shared/application/dtos/base/base.dto";

export class TopUpCreateAPIRequestDto extends BaseDto<TopUpCreateAPIRequestDto> {
    @IsNumber()
    @IsPositive()
    @IsNotEmpty()
    @Expose()
    wallet_id: number;
    @IsNumber()
    @IsPositive()
    @IsNotEmpty()
    @Expose()
    amount: number;
}
