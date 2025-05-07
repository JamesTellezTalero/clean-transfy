import { ApiProperty } from "@nestjs/swagger";

/**
 * Entidad que representa a un usuario.
 */
export class User {
    /**
     * Identificador único del usuario.
     */
    @ApiProperty({ name: "id", type: "number" })
    id: number;

    /**
     * Nombre de usuario.
     */
    @ApiProperty({ name: "username", type: "string" })
    username: string;

    /**
     * Contraseña del usuario (No se debe devolver en las respuestas HTTP).
     */
    password: string;

    /**
     * UUID único del usuario.
     */
    @ApiProperty({ name: "uuid", type: "string" })
    uuid: string;

    /**
     * Estado del usuario.
     */
    @ApiProperty({ name: "status", type: "boolean" })
    status: boolean;

    /**
     * Primer nombre del usuario.
     */
    @ApiProperty({ name: "first_name", type: "string" })
    first_name: string;

    /**
     * Segundo nombre del usuario.
     */
    @ApiProperty({ name: "middle_name", type: "string" })
    middle_name: string;

    /**
     * Primer apellido del usuario.
     */
    @ApiProperty({ name: "last_name", type: "string" })
    last_name: string;

    /**
     * Segundo apellido del usuario.
     */
    @ApiProperty({ name: "second_last_name", type: "string" })
    second_last_name: string;

    /**
     * Número de identificación del usuario.
     */
    @ApiProperty({ name: "identification_number", type: "string" })
    identification_number: string;

    /**
     * Identificador del tipo de identificación del usuario.
     */
    @ApiProperty({ name: "identification_type_id", type: "number" })
    identification_type_id: number;

    /**
     * Correo electrónico del usuario.
     */
    @ApiProperty({ name: "email", type: "string" })
    email: string;

    /**
     * Teléfono del usuario.
     */
    @ApiProperty({ name: "phone", type: "string" })
    phone: string;

    /**
     * Dirección del usuario.
     */
    @ApiProperty({ name: "address", type: "string" })
    address: string;

    /**
     * Fecha de creación del usuario.
     */
    @ApiProperty({ name: "created_at", type: "string", format: "date-time" })
    created_at: Date;

    /**
     * Fecha de última actualización del usuario.
     */
    @ApiProperty({ name: "updated_at", type: "string", format: "date-time" })
    updated_at: Date;
}
