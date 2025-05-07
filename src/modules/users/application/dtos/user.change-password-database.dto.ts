/**
 * DTO para el cambio de contraseña de un usuario
 */
export class UserChangePasswordDatabaseDto {
    /**
     * Contraseña actual del usuario
     * @example "MiViejaContraseña123"
     */
    old_password: string;

    /**
     * Nueva contraseña del usuario
     * @example "MiNuevaContraseña456"
     */
    new_password: string;
}
