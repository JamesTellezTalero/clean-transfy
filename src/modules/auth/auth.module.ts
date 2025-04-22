import { Global, Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { JwtAdapter } from "./infrastructure/services/jwt.service";
import { AuthGuard } from "./infrastructure/guards/auth.guard";

@Global()
@Module({
    imports: [
        JwtModule.register({
            secret: process.env.JWT_SECRET || "default-secret",
            signOptions: { expiresIn: "1h" }
        })
    ],
    providers: [
        {
            provide: "IAuthService",
            useClass: JwtAdapter
        },
        AuthGuard
    ],
    exports: ["IAuthService", AuthGuard]
})
export class AuthModule {}
