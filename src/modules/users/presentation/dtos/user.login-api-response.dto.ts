import { ApiProperty } from "@nestjs/swagger";
import { User } from "../../domain/entities/user.entity";
import { BaseDto } from "src/shared/application/dtos/base/base.dto";

/**
 * DTO utilizado para la respuesta del inicio de sesión de un usuario.
 * Contiene un token JWT y los detalles del usuario.
 */
export class UserLoginApiResponseDto extends BaseDto<UserLoginApiResponseDto> {
    /**
     * Token de autenticación generado para el usuario.
     * Este token se usa para autenticar al usuario en futuras solicitudes.
     * @example "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZXhwIjoxNjQ2ODI5MTEyLCJpYXQiOjE2NDY4Mjg5MTJ9.qY7f4eODJh1kzNKxZGzZa_r1qHMI5Y-FxA3sFTvn5DQ"
     */
    @ApiProperty({
        name: "token",
        type: "string",
        description:
            "Authentication token used for user authentication in future requests"
    })
    token: string;

    /**
     * Detalles del usuario autenticado.
     * @example { "id": 1, "username": "johndoe", "email": "johndoe@example.com", ... }
     */
    @ApiProperty({
        name: "user",
        type: User,
        description: "The user details returned after successful login"
    })
    user: User;
}
