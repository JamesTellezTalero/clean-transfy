import { Global, Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { JwtAdapter } from "./jwt.service";

@Global()
@Module({
    imports: [
        JwtModule.register({
            secret: process.env.JWT_SECRET || "default-secret",
            signOptions: { expiresIn: "1h" }
        })
    ],
    providers: [JwtAdapter],
    exports: [
        JwtAdapter,
        {
            provide: "IAuthService",
            useClass: JwtAdapter
        }
    ]
})
export class AuthModule {}
