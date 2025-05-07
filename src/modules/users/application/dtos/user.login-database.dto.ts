/**
 * DTO para el inicio de sesión de un usuario
 */
export class UserLoginDatabaseDto {
    /**
     * Nombre de usuario o correo electrónico del usuario
     * @example "jeimsdev" o "james@example.com"
     */
    username_or_email: string;

    /**
     * Contraseña del usuario
     * @example "claveSegura123"
     */
    password: string;
}
