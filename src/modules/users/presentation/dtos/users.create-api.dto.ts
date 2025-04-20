import { Expose } from "class-transformer";
import {
    IsNotEmpty,
    IsNumber,
    IsNumberString,
    IsPositive,
    IsString
} from "class-validator";
import { BaseDto } from "src/shared/application/dtos/base/base.dto";

export class UserCreateApiDto extends BaseDto<UserCreateApiDto> {
    @IsString()
    @IsNotEmpty()
    @Expose()
    username: string;
    @IsString()
    @IsNotEmpty()
    @Expose()
    first_name: string;
    @IsString()
    @IsNotEmpty()
    @Expose()
    password: string;
    @IsString()
    @IsNotEmpty()
    @Expose()
    middle_name: string;
    @IsString()
    @IsNotEmpty()
    @Expose()
    last_name: string;
    @IsString()
    @IsNotEmpty()
    @Expose()
    second_last_name: string;
    @IsNumberString()
    @IsNotEmpty()
    @Expose()
    identification_number: string;
    @IsNumber()
    @IsPositive()
    @Expose()
    identification_type_id: number;
    @IsString()
    @IsNotEmpty()
    @Expose()
    email: string;
    @IsString()
    @IsNotEmpty()
    @Expose()
    phone: string;
    @IsString()
    @IsNotEmpty()
    @Expose()
    address: string;

    reg_status_id?: number;
}
