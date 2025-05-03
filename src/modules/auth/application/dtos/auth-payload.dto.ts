/**
 * DTO para el contenido suministrado la creacion del token auth
 */
export class AuthPayloadDto {
    /**
     * User UUUID del usuario.
     * @example "7ea3b7fe-f496-4bb3-8797-5eb5916b2881"
     */
    readonly user_uuid: string;

    /**
     * Crea una nueva instancia del payload necesario para la creacion del token
     * @param user_uuid UUID del usuario
     */
    constructor(user_uuid: string) {
        this.user_uuid = user_uuid;
    }
}
