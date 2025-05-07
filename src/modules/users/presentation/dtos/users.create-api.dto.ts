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

/**
 * DTO utilizado para recibir los datos necesarios para crear un nuevo usuario.
 */
export class UserCreateAPIRequestDto extends BaseDto<UserCreateAPIRequestDto> {
    /**
     * Nombre de usuario único para la autenticación.
     * @example "juanperez123"
     */
    @ApiProperty({
        name: "username",
        type: "string",
        description: "Unique username for authentication"
    })
    @IsString()
    @IsNotEmpty()
    @Expose()
    username: string;

    /**
     * Primer nombre del usuario.
     * @example "Juan"
     */
    @ApiProperty({
        name: "first_name",
        type: "string",
        description: "First name of the user"
    })
    @IsString()
    @IsNotEmpty()
    @Expose()
    first_name: string;

    /**
     * Contraseña del usuario para la autenticación.
     * @example "strongPassword123!"
     */
    @ApiProperty({
        name: "password",
        type: "string",
        description: "Password for user authentication"
    })
    @IsString()
    @IsNotEmpty()
    @Expose()
    password: string;

    /**
     * Segundo nombre del usuario (si aplica).
     * @example "Andres"
     */
    @ApiProperty({
        name: "middle_name",
        type: "string",
        description: "Middle name of the user (optional)"
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
        description: "Last name of the user"
    })
    @IsString()
    @IsNotEmpty()
    @Expose()
    last_name: string;

    /**
     * Segundo apellido del usuario.
     * @example "Ramirez"
     */
    @ApiProperty({
        name: "second_last_name",
        type: "string",
        description: "Second last name of the user"
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
        description: "Identification number of the user"
    })
    @IsNumberString()
    @IsNotEmpty()
    @Expose()
    identification_number: string;

    /**
     * Tipo de identificación del usuario.
     * @example 1 (ID Card)
     */
    @ApiProperty({
        name: "identification_type_id",
        type: "number",
        description: "ID for the type of identification (e.g., 1 for ID Card)"
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
        description: "Email address of the user"
    })
    @IsString()
    @IsNotEmpty()
    @Expose()
    email: string;

    /**
     * Número de teléfono del usuario.
     * @example "+573001234567"
     */
    @ApiProperty({
        name: "phone",
        type: "string",
        description: "Phone number of the user"
    })
    @IsString()
    @IsNotEmpty()
    @Expose()
    phone: string;

    /**
     * Dirección del usuario.
     * @example "Calle 123, Bogotá, Colombia"
     */
    @ApiProperty({
        name: "address",
        type: "string",
        description: "Address of the user"
    })
    @IsString()
    @IsNotEmpty()
    @Expose()
    address: string;
}
