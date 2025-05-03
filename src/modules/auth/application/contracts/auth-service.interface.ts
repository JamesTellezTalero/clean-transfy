import { AuthPayloadDto } from "../dtos/auth-payload.dto";
/**
 * Define la implementacion para los servicios de authenticacion.
 */
export interface IAuthService {
    /**
     * Metodo encargado de generar el token bearer par ala authenticacion.
     *
     * @param {AuthPayloadDto} payload - corresponde al contenido necesario para crear el token auth
     * @returns {string} token de tipo bearer necesario para el proceso de autenticacion
     */
    generateToken(payload: AuthPayloadDto): string;

    /**
     * Define la implementacion para los servicios de authenticacion.
     *
     * @param {string} token de tipo bearer necesario para el proceso de autenticacion
     * @returns {AuthPayloadDto} payload - corresponde al contenido necesario para validaciones de metodos authenticcacion
     */
    verifyToken(token: string): AuthPayloadDto | null;
}
