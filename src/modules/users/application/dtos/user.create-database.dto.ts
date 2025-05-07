/**
 * DTO para la creación de usuarios
 */
export class UserCreateDatabaseDto {
    /**
     * Nombre de usuario
     * @example "jeimsdev"
     */
    username: string;

    /**
     * Contraseña del usuario
     * @example "claveSegura123"
     */
    password: string;

    /**
     * Primer nombre del usuario
     * @example "James"
     */
    first_name: string;

    /**
     * Segundo nombre del usuario
     * @example "Andrés"
     */
    middle_name: string;

    /**
     * Primer apellido del usuario
     * @example "Rodríguez"
     */
    last_name: string;

    /**
     * Segundo apellido del usuario
     * @example "Gómez"
     */
    second_last_name: string;

    /**
     * Número de identificación del usuario
     * @example "1234567890"
     */
    identification_number: string;

    /**
     * ID del tipo de identificación (relación con IdentificationType)
     * @example 1
     */
    identification_type_id: number;

    /**
     * Correo electrónico del usuario
     * @example "james@example.com"
     */
    email: string;

    /**
     * Número de teléfono del usuario
     * @example "+573001112233"
     */
    phone: string;

    /**
     * Dirección del usuario
     * @example "Calle 123 #45-67, Bogotá"
     */
    address: string;
}
