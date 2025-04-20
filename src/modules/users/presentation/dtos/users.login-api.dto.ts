import { Expose } from "class-transformer";
import {
    IsNotEmpty,
    IsNumber,
    IsNumberString,
    IsPositive,
    IsString
} from "class-validator";
import { BaseDto } from "src/shared/application/dtos/base/base.dto";

export class UserLoginApiDto extends BaseDto<UserLoginApiDto> {
    @IsString()
    @IsNotEmpty()
    @Expose()
    username_or_email: string;
    @IsString()
    @IsNotEmpty()
    @Expose()
    password: string;
}
