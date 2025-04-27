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

export class TopUpCreateAPIRequestDto extends BaseDto<TopUpCreateAPIRequestDto> {
    @ApiProperty({ name: "wallet_uuid", type: "string" })
    @IsUUID()
    @IsNotEmpty()
    @Expose()
    wallet_uuid: string;
    @ApiProperty({ name: "user_uuid", type: "string" })
    @IsUUID()
    @IsNotEmpty()
    @Expose()
    user_uuid: string;
    @ApiProperty({ name: "amount", type: "number" })
    @IsNumber()
    @IsPositive()
    @Type(() => Number)
    @Expose()
    amount: number;
}
