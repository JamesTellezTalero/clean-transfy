import { Global, Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { IAuthService } from "src/shared/application/contracts/auth-service.interface";
import { AuthPayloadDto } from "src/shared/application/dtos/auth/auth-payload.dto";

@Injectable()
export class JwtAdapter implements IAuthService {
    constructor(private readonly jwt: JwtService) {}

    generateToken(payload: AuthPayloadDto): string {
        return this.jwt.sign(payload);
    }

    verifyToken(token: string): AuthPayloadDto | null {
        try {
            return this.jwt.verify(token);
        } catch {
            return null;
        }
    }
}
