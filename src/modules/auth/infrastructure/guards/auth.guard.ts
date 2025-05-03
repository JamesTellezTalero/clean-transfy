import {
    CanActivate,
    ExecutionContext,
    Inject,
    Injectable,
    UnauthorizedException
} from "@nestjs/common";
import { Request } from "express";
import { IAuthService } from "../../application/contracts/auth-service.interface";
import { UnauthorizedResponse } from "src/shared/application/dtos/api-responses/errors/unauthorized-error-response.dto";
import { ForbidenResponse } from "src/shared/application/dtos/api-responses/errors/forbiden-error-response.dto";

/**
 * Guard para verificar si un token es valido.
 *
 * Este guard se usa para proteger rutas validando la integridad y validez.
 */
@Injectable()
export class AuthGuard implements CanActivate {
    /**
     * Crea una instancia del guard con el servicio de autenticacion inyectado.
     *
     * @param {IAuthService} authService - Servicio que permite consultar información del usuario.
     */
    constructor(
        @Inject("IAuthService")
        private readonly authService: IAuthService
    ) {}

    /**
     * Verifica la autenticidad del token.
     *
     * @param context - Contexto de ejecución.
     * @returns {boolean} si el usuario está activo.
     * @throws {ForbidenResponse} Si el token no es sumministrado.
     * @throws {UnauthorizedResponse} Si el token es invalido o ha expirado.
     */
    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest<Request>();

        const token = this.extractTokenFromHeader(request);
        if (!token) throw new ForbidenResponse("No token provided");

        const payload = this.authService.verifyToken(token);

        if (!payload)
            throw new UnauthorizedResponse("Invalid or expired token");

        // (Opcional) Inyectar uuid en el body
        if (request.body && typeof request.body === "object") {
            request.body.user_uuid = payload.user_uuid;
        }

        return true;
    }

    /**
     * Verifica la autenticidad del token.
     *
     * @param {Request} requuest - request de la peticion http.
     * @returns {string} token enviado en los headers.
     * @returns {null} en caso de no encontrar token en los headers.
     */
    private extractTokenFromHeader(request: Request): string | null {
        const authHeader = request.headers.authorization;
        if (!authHeader) return null;

        const parts = authHeader.split(" ");
        return parts.length === 2 && parts[0] === "Bearer" ? parts[1] : null;
    }
}
