import { AuthPayloadDto } from "../dtos/auth/auth-payload.dto";

export interface IAuthService {
    generateToken(payload: AuthPayloadDto): string;
    verifyToken(token: string): AuthPayloadDto | null;
}
