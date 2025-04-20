import { Inject, Injectable } from "@nestjs/common";
import { IUserRepository } from "../../domain/repositories/user.respository.interface";
import { IUseCase } from "src/shared/domain/use-cases/use-case.interface";
import { NotFoundResponse } from "src/shared/application/dtos/api-responses/errors/not-found-error-response.dto";
import { HashUtils } from "src/shared/infrastructure/utils/hash.utils";
import { StringUtils } from "src/shared/domain/utils/string.utils";

@Injectable()
export class resetPasswordUserUseCase implements IUseCase<string, void> {
    constructor(
        @Inject("IUserRepository")
        private userRepository: IUserRepository
    ) {}

    async execute(uuid: string): Promise<void> {
        const UserEntity = await this.userRepository.findByUuid(uuid);
        if (!UserEntity) throw new NotFoundResponse("Sent User doesn't exist");

        UserEntity.password = await HashUtils.hashPassword(
            StringUtils.generateRandomString(15, {
                letters: true,
                numbers: true,
                specialChars: true
            })
        );
        UserEntity.updated_at = new Date();

        await this.userRepository.update(UserEntity.id, UserEntity);
        return;
    }
}
