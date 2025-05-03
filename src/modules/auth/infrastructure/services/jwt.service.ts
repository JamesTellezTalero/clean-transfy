import { Global, Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { AuthPayloadDto } from "src/modules/auth/application/dtos/auth-payload.dto";
import { IAuthService } from "../../application/contracts/auth-service.interface";

/**
 * Clase encargada de generar y validar tokens JWT.
 *
 * Esta clase impleneta la interfaz IAuthService lo que le delega la logica al adaptador JwtAdapter
 * Esta clase se encarga de desacoplar la authenticacion especificada en JWT
 */
@Injectable()
export class JwtAdapter implements IAuthService {
    /**
     * Crea una instancia del adaptador con el servicio de jwt inyectado.
     *
     * @param {JwtService} jwt - Servicio que permite firmar y verificar el token.
     */
    constructor(private readonly jwt: JwtService) {}

    /**
     * Genera un token JWT a partir del payload dado.
     *
     * @param { AuthPayloadDto} payload - Datos que se incluirán en el token JWT.
     * @returns Token JWT firmado como cadena de texto.
     */
    generateToken(payload: AuthPayloadDto): string {
        return this.jwt.sign(payload);
    }

    /**
     * Valida un token JWT a partir del string dado.
     *
     * @param { string} payload - Token JWT firmado como cadena de texto.
     * @returns {AuthPayloadDto} .Datos conetenidos en el token JWT
     */
    verifyToken(token: string): AuthPayloadDto | null {
        try {
            return this.jwt.verify(token);
        } catch {
            return null;
        }
    }
}
