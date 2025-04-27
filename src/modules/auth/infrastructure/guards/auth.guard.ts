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

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(
        @Inject("IAuthService")
        private readonly authService: IAuthService
    ) {}

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

    private extractTokenFromHeader(request: Request): string | null {
        const authHeader = request.headers.authorization;
        if (!authHeader) return null;

        const parts = authHeader.split(" ");
        return parts.length === 2 && parts[0] === "Bearer" ? parts[1] : null;
    }
}
