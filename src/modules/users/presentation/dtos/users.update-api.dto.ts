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

/**
 * DTO utilizado para actualizar la información de un usuario.
 */
export class UserUpdateAPIRequestDto extends BaseDto<UserUpdateAPIRequestDto> {
    /**
     * Nombre de usuario del usuario.
     * @example "juanperez123"
     */
    @ApiProperty({
        name: "username",
        type: "string",
        description: "Username for the user"
    })
    @IsString()
    @IsNotEmpty()
    @Expose()
    username: string;

    /**
     * Nueva contraseña del usuario.
     * @example "newPassword@123!"
     */
    @ApiProperty({
        name: "password",
        type: "string",
        description: "New password for the user"
    })
    @IsString()
    @IsNotEmpty()
    @Expose()
    password: string;

    /**
     * Primer nombre del usuario.
     * @example "Juan"
     */
    @ApiProperty({
        name: "first_name",
        type: "string",
        description: "User's first name"
    })
    @IsString()
    @IsNotEmpty()
    @Expose()
    first_name: string;

    /**
     * Segundo nombre del usuario.
     * @example "Carlos"
     */
    @ApiProperty({
        name: "middle_name",
        type: "string",
        description: "User's middle name"
    })
    @IsString()
    @IsNotEmpty()
    @Expose()
    middle_name: string;

    /**
     * Apellido del usuario.
     * @example "Pérez"
     */
    @ApiProperty({
        name: "last_name",
        type: "string",
        description: "User's last name"
    })
    @IsString()
    @IsNotEmpty()
    @Expose()
    last_name: string;

    /**
     * Segundo apellido del usuario.
     * @example "González"
     */
    @ApiProperty({
        name: "second_last_name",
        type: "string",
        description: "User's second last name"
    })
    @IsString()
    @IsNotEmpty()
    @Expose()
    second_last_name: string;

    /**
     * Número de identificación del usuario.
     * @example "123456789"
     */
    @ApiProperty({
        name: "identification_number",
        type: "string",
        description: "User's identification number"
    })
    @IsString()
    @IsNumberString()
    @Expose()
    identification_number: string;

    /**
     * ID del tipo de identificación.
     * @example 1
     */
    @ApiProperty({
        name: "identification_type_id",
        type: "number",
        description: "ID for the type of identification"
    })
    @IsNumber()
    @IsPositive()
    @Expose()
    identification_type_id: number;

    /**
     * Correo electrónico del usuario.
     * @example "juan.perez@mail.com"
     */
    @ApiProperty({
        name: "email",
        type: "string",
        description: "User's email address"
    })
    @IsString()
    @IsNotEmpty()
    @Expose()
    @IsEmail()
    email: string;

    /**
     * Teléfono del usuario.
     * @example "+573001234567"
     */
    @ApiProperty({
        name: "phone",
        type: "string",
        description: "User's phone number"
    })
    @IsString()
    @IsNotEmpty()
    @Expose()
    phone: string;

    /**
     * Dirección del usuario.
     * @example "Carrera 5 # 10-20, Bogotá"
     */
    @ApiProperty({
        name: "address",
        type: "string",
        description: "User's address"
    })
    @IsString()
    @IsNotEmpty()
    @Expose()
    address: string;
}
