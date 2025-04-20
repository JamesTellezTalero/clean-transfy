import { Inject, Injectable } from "@nestjs/common";
import { NotFoundResponse } from "src/shared/application/dtos/api-responses/errors/not-found-error-response.dto";
import { IUseCase } from "src/shared/domain/use-cases/use-case.interface";
import { UserChangePasswordDatabaseDto } from "../dtos/user.change-password-database.dto";
import { User } from "../../domain/entities/user.entity";
import { IUserRepository } from "../../domain/repositories/user.respository.interface";
import { HashUtils } from "src/shared/infrastructure/utils/hash.utils";
import { ConflictResponse } from "src/shared/application/dtos/api-responses/errors/conflict-error-response.dto";

@Injectable()
export class changePasswordUserUseCase
    implements
        IUseCase<
            {
                uuid: string;
                updateDto: UserChangePasswordDatabaseDto;
            },
            User
        >
{
    constructor(
        @Inject("IUserRepository")
        private userRepository: IUserRepository
    ) {}

    async execute(updateBody: {
        uuid: string;
        updateDto: UserChangePasswordDatabaseDto;
    }): Promise<User> {
        const preExistUser = await this.userRepository.findByUuid(
            updateBody.uuid
        );
        if (!preExistUser)
            throw new NotFoundResponse("Sent User doesn't exist");

        const UserPasswordPrevExist =
            await this.userRepository.findPasswordByUuid(updateBody.uuid);

        const isValidPassword = await HashUtils.comparePasswords(
            updateBody.updateDto.old_password,
            UserPasswordPrevExist
        );

        if (!isValidPassword)
            throw new ConflictResponse("Sent password is incorrect");

        preExistUser.password = await HashUtils.hashPassword(
            updateBody.updateDto.new_password
        );
        preExistUser.updated_at = new Date();

        await this.userRepository.update(preExistUser.id, preExistUser);
        return await this.userRepository.findById(preExistUser.id);
    }
}
