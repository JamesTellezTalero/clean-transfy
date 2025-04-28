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
export class UserChangePasswordApiDto extends BaseDto<UserChangePasswordApiDto> {
    @ApiProperty({ name: "new_password", type: "string" })
    @IsString()
    @IsNotEmpty()
    @Expose()
    new_password: string;
    @ApiProperty({ name: "old_password", type: "string" })
    @IsString()
    @IsNotEmpty()
    @Expose()
    old_password: string;
}
