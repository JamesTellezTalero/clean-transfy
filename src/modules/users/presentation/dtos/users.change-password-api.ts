import { ApiProperty } from "@nestjs/swagger";
import { Expose } from "class-transformer";
import { IsNotEmpty, IsString } from "class-validator";
import { BaseDto } from "src/shared/application/dtos/base/base.dto";

/**
 * DTO utilizado para recibir la solicitud de cambio de contraseña del usuario.
 * Contiene el campo para la contraseña actual y la nueva contraseña del usuario.
 */
export class UserChangePasswordAPIRequestDto extends BaseDto<UserChangePasswordAPIRequestDto> {
    /**
     * La nueva contraseña del usuario.
     * @example "newStrongPassword123!"
     */
    @ApiProperty({
        name: "new_password",
        type: "string",
        description: "The new password the user wants to set"
    })
    @IsString()
    @IsNotEmpty()
    @Expose()
    new_password: string;

    /**
     * La contraseña actual del usuario, que se usará para verificar su identidad.
     * @example "currentPassword123"
     */
    @ApiProperty({
        name: "old_password",
        type: "string",
        description: "The current password of the user for authentication"
    })
    @IsString()
    @IsNotEmpty()
    @Expose()
    old_password: string;
}
