import { BaseDto } from "src/shared/application/dtos/base/base.dto";
import { IsString, Length } from "class-validator";
import { Expose } from "class-transformer";
import { ApiProperty } from "@nestjs/swagger";

export class BankUpdateAPIRequestDto extends BaseDto<BankUpdateAPIRequestDto> {
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
