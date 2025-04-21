import { Expose, Type } from "class-transformer";
import {
    IsNotEmpty,
    IsNumber,
    IsPositive,
    IsString,
    Length
} from "class-validator";
import { BaseDto } from "src/shared/application/dtos/base/base.dto";

export class TransferCreateAPIRequestDto extends BaseDto<TransferCreateAPIRequestDto> {
    @IsNumber()
    @IsPositive()
    @IsNotEmpty()
    @Expose()
    source_wallet_id: number;
    @IsNumber()
    @IsPositive()
    @IsNotEmpty()
    @Expose()
    target_wallet_id: number;
    @IsNumber()
    @IsPositive()
    @IsNotEmpty()
    @Type(() => Number)
    @Expose()
    amount: number;
}
