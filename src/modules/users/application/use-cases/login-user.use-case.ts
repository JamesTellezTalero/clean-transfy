import { Inject, Injectable } from "@nestjs/common";
import { IUseCase } from "src/shared/domain/use-cases/use-case.interface";
import { UserLoginDatabaseDto } from "../dtos/user.login-database.dto";
import { User } from "../../domain/entities/user.entity";
import { IUserRepository } from "../../domain/repositories/user.respository.interface";
import { HashUtils } from "src/shared/infrastructure/utils/hash.utils";
import { NotFoundResponse } from "src/shared/application/dtos/api-responses/errors/not-found-error-response.dto";
import { IAuthService } from "src/modules/auth/application/contracts/auth-service.interface";
import { UserLoginApiResponseDto } from "../../presentation/dtos/user.login-api-response.dto";
import { ConflictResponse } from "src/shared/application/dtos/api-responses/errors/conflict-error-response.dto";

@Injectable()
export class loginUserUseCase
    implements IUseCase<UserLoginDatabaseDto, UserLoginApiResponseDto>
{
    constructor(
        @Inject("IUserRepository")
        private userRepository: IUserRepository,
        @Inject("IAuthService")
        private authService: IAuthService
    ) {}

    async execute(
        loginDto: UserLoginDatabaseDto
    ): Promise<UserLoginApiResponseDto> {
        const UserPrevExist =
            (await this.userRepository.findByUsername(
                loginDto.username_or_email
            )) ||
            (await this.userRepository.findByEmail(loginDto.username_or_email));
        if (!UserPrevExist)
            throw new NotFoundResponse("Sent Username or Email not found");

        const UserPasswordPrevExist =
            await this.userRepository.findPasswordByUuid(UserPrevExist.uuid);

        const isValidPassword = await HashUtils.comparePasswords(
            loginDto.password,
            UserPasswordPrevExist
        );

        if (!isValidPassword)
            throw new ConflictResponse("Sent password doesn't match");
        return {
            user: UserPrevExist,
            token: this.authService.generateToken({
                user_uuid: UserPrevExist.uuid
            })
        };
    }
}
