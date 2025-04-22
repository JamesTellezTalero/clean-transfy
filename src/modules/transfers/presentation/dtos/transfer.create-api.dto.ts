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

export class TransferCreateAPIRequestDto extends BaseDto<TransferCreateAPIRequestDto> {
    @IsUUID()
    @IsNotEmpty()
    @Expose()
    user_uuid: string;
    @IsUUID()
    @IsNotEmpty()
    @Expose()
    source_wallet_uuid: string;
    @IsUUID()
    @IsNotEmpty()
    @Expose()
    target_wallet_uuid: string;
    @IsNumber()
    @IsPositive()
    @IsNotEmpty()
    @Type(() => Number)
    @Expose()
    amount: number;
}
