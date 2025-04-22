export class AuthPayloadDto {
    readonly user_uuid: string;

    /**
     * Crea una nueva instancia del payload necesario para la creacion del token
     * @param user_uuid UUID del usuario
     */
    constructor(user_uuid: string) {
        this.user_uuid = user_uuid;
    }
}
