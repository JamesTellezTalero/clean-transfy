import { ApiProperty } from "@nestjs/swagger";
import { Expose } from "class-transformer";
import { IsNotEmpty, IsString } from "class-validator";
import { BaseDto } from "src/shared/application/dtos/base/base.dto";

/**
 * DTO utilizado para recibir los datos de inicio de sesión de un usuario.
 */
export class UserLoginAPIRequestDto extends BaseDto<UserLoginAPIRequestDto> {
    /**
     * Nombre de usuario o correo electrónico del usuario.
     * Este campo se usa para autenticar al usuario, ya sea con su nombre de usuario o su correo electrónico.
     * @example "juanperez123" o "juan.perez@mail.com"
     */
    @ApiProperty({
        name: "username_or_email",
        type: "string",
        description: "Username or email address used for user authentication"
    })
    @IsString()
    @IsNotEmpty()
    @Expose()
    username_or_email: string;

    /**
     * Contraseña del usuario.
     * Este campo se usa junto con el nombre de usuario o correo electrónico para autenticar al usuario.
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
}
