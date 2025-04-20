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
    @IsString()
    @IsNotEmpty()
    @Expose()
    new_password: string;
    @IsString()
    @IsNotEmpty()
    @Expose()
    old_password: string;
}
