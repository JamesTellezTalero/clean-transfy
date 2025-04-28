import { ApiProperty } from "@nestjs/swagger";
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
    @ApiProperty({ name: "user_uuid", type: "string" })
    @IsUUID()
    @IsNotEmpty()
    @Expose()
    user_uuid: string;
    @ApiProperty({ name: "source_wallet_uuid", type: "string" })
    @IsUUID()
    @IsNotEmpty()
    @Expose()
    source_wallet_uuid: string;
    @ApiProperty({ name: "target_wallet_uuid", type: "string" })
    @IsUUID()
    @IsNotEmpty()
    @Expose()
    target_wallet_uuid: string;
    @ApiProperty({ name: "amount", type: "number" })
    @IsNumber()
    @IsPositive()
    @IsNotEmpty()
    @Type(() => Number)
    @Expose()
    amount: number;
}
