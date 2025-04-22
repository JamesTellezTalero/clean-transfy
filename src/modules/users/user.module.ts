import { Module } from "@nestjs/common";
import { UserController } from "./presentation/controllers/user.controller";
import { UserRepositoryService } from "./infrastructure/repositories/user.repository.service";
import { createUserUseCase } from "./application/use-cases/create-user.use-case";
import { deleteUserUseCase } from "./application/use-cases/delete-users.use-case";
import { loginUserUseCase } from "./application/use-cases/login-user.use-case";
import { findAllUserUseCase } from "./application/use-cases/find-all-user.use-case";
import { findByIdUserUseCase } from "./application/use-cases/find-by-id-user.use-case";
import { findByEmailUserUseCase } from "./application/use-cases/find-by-email-user.use-case";
import { findByUsernameUserUseCase } from "./application/use-cases/find-by-username-user.use-case";
import { findByIdentificationNumberAndIdentificationTypeIdUserUseCase } from "./application/use-cases/find-by-identification-number-and-identification-type-id-user.use-case";
import { disableOrEnableUserUseCase } from "./application/use-cases/disable-or-enable-user.use-case";
import { changePasswordUserUseCase } from "./application/use-cases/change-password-user.use-case";
import { resetPasswordUserUseCase } from "./application/use-cases/reset-password-user.use-case";
import { updateUserUseCase } from "./application/use-cases/update-user.use-case";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserORMEntity } from "./infrastructure/orm/user.orm-entity";
import { AuthModule } from "src/modules/auth/auth.module";

@Module({
    imports: [TypeOrmModule.forFeature([UserORMEntity]), AuthModule],
    controllers: [UserController],
    providers: [
        {
            provide: "IUserRepository",
            useClass: UserRepositoryService
        },
        createUserUseCase,
        deleteUserUseCase,
        loginUserUseCase,
        findAllUserUseCase,
        findByIdUserUseCase,
        findByEmailUserUseCase,
        findByUsernameUserUseCase,
        findByIdentificationNumberAndIdentificationTypeIdUserUseCase,
        disableOrEnableUserUseCase,
        changePasswordUserUseCase,
        resetPasswordUserUseCase,
        updateUserUseCase
    ],
    exports: ["IUserRepository"]
})
export class UserModule {}
