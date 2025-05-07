/**
 * DTO para la actualización de la información de un usuario
 */
export class UserUpdateDatabaseDto {
    /**
     * Nombre de usuario del usuario
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
     * @example "Alexander"
     */
    middle_name: string;

    /**
     * Primer apellido del usuario
     * @example "Smith"
     */
    last_name: string;

    /**
     * Segundo apellido del usuario
     * @example "Doe"
     */
    second_last_name: string;

    /**
     * Número de identificación del usuario
     * @example "1234567890"
     */
    identification_number: string;

    /**
     * ID del tipo de identificación del usuario
     * @example 1
     */
    identification_type_id: number;

    /**
     * Correo electrónico del usuario
     * @example "james@example.com"
     */
    email: string;

    /**
     * Teléfono del usuario
     * @example "+573001234567"
     */
    phone: string;

    /**
     * Dirección del usuario
     * @example "Calle 123, Ciudad, País"
     */
    address: string;
}
