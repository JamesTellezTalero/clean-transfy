import { ApiProperty } from "@nestjs/swagger";
import { Expose } from "class-transformer";
import {
    IsNotEmpty,
    IsNumber,
    IsNumberString,
    IsPositive,
    IsString
} from "class-validator";
import { BaseDto } from "src/shared/application/dtos/base/base.dto";

export class UserLoginAPIRequestDto extends BaseDto<UserLoginAPIRequestDto> {
    @ApiProperty({ name: "username_or_email", type: "string" })
    @IsString()
    @IsNotEmpty()
    @Expose()
    username_or_email: string;
    @ApiProperty({ name: "password", type: "string" })
    @IsString()
    @IsNotEmpty()
    @Expose()
    password: string;
}
