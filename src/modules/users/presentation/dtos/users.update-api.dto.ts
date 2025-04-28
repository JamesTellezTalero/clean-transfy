import { ApiProperty } from "@nestjs/swagger";
import { Expose } from "class-transformer";
import {
    IsEmail,
    IsNotEmpty,
    IsNumber,
    IsNumberString,
    IsPositive,
    IsString
} from "class-validator";
import { BaseDto } from "src/shared/application/dtos/base/base.dto";

export class UserUpdateApiDto extends BaseDto<UserUpdateApiDto> {
    @ApiProperty({ name: "username", type: "string" })
    @IsString()
    @IsNotEmpty()
    @Expose()
    username: string;
    @ApiProperty({ name: "password", type: "string" })
    @IsString()
    @IsNotEmpty()
    @Expose()
    password: string;
    @ApiProperty({ name: "first_name", type: "string" })
    @IsString()
    @IsNotEmpty()
    @Expose()
    first_name: string;
    @ApiProperty({ name: "middle_name", type: "string" })
    @IsString()
    @IsNotEmpty()
    @Expose()
    middle_name: string;
    @ApiProperty({ name: "last_name", type: "string" })
    @IsString()
    @IsNotEmpty()
    @Expose()
    last_name: string;
    @ApiProperty({ name: "second_last_name", type: "string" })
    @IsString()
    @IsNotEmpty()
    @Expose()
    second_last_name: string;
    @ApiProperty({ name: "identification_number", type: "string" })
    @IsString()
    @IsNumberString()
    @Expose()
    identification_number: string;
    @ApiProperty({ name: "identification_type_id", type: "number" })
    @IsNumber()
    @IsPositive()
    @Expose()
    identification_type_id: number;
    @ApiProperty({ name: "email", type: "string" })
    @IsString()
    @IsNotEmpty()
    @Expose()
    @IsEmail()
    email: string;
    @ApiProperty({ name: "phone", type: "string" })
    @IsString()
    @IsNotEmpty()
    @Expose()
    phone: string;
    @ApiProperty({ name: "address", type: "string" })
    @IsString()
    @IsNotEmpty()
    @Expose()
    address: string;
}
