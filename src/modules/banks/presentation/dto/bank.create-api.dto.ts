import { ApiProperty } from "@nestjs/swagger";
import { Expose } from "class-transformer";
import { IsString, Length } from "class-validator";
import { BaseDto } from "src/shared/application/dtos/base/base.dto";

export class BankCreateAPIRequestDto extends BaseDto<BankCreateAPIRequestDto> {
    @ApiProperty({ description: "Bank Name" })
    @IsString()
    @Expose()
    name: string;
    @ApiProperty({ description: "Bank Code" })
    @IsString()
    @Length(6, 6)
    @Expose()
    code: string;
}
