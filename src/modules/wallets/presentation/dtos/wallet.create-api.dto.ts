import { ApiProperty } from "@nestjs/swagger";
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
    @ApiProperty({ name: "user_uuid", type: "string" })
    @IsString()
    @IsNotEmpty()
    @Expose()
    user_uuid: string;
    @Expose()
    user_id: number;
    @ApiProperty({ name: "bank_id", type: "number" })
    @IsNumber()
    @IsPositive()
    @Expose()
    bank_id: number;
}
