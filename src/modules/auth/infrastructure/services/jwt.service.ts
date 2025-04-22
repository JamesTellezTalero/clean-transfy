import { Global, Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { AuthPayloadDto } from "src/modules/auth/application/dtos/auth-payload.dto";
import { IAuthService } from "../../application/contracts/auth-service.interface";

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
