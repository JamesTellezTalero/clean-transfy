import { Expose, Type } from "class-transformer";
import {
    IsNotEmpty,
    IsNumber,
    IsPositive,
    IsString,
    IsUUID,
    Length
} from "class-validator";
import { BaseDto } from "src/shared/application/dtos/base/base.dto";

export class TopUpCreateAPIRequestDto extends BaseDto<TopUpCreateAPIRequestDto> {
    @IsUUID()
    @IsNotEmpty()
    @Expose()
    wallet_uuid: string;
    @IsUUID()
    @IsNotEmpty()
    @Expose()
    user_uuid: string;
    @IsNumber()
    @IsPositive()
    @Type(() => Number)
    @Expose()
    amount: number;
}
