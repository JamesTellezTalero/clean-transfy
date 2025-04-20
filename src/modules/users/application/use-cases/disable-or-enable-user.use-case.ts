import { Inject, Injectable } from "@nestjs/common";
import { IUseCase } from "src/shared/domain/use-cases/use-case.interface";
import { User } from "../../domain/entities/user.entity";
import { IUserRepository } from "../../domain/repositories/user.respository.interface";
import { NotFoundResponse } from "src/shared/application/dtos/api-responses/errors/not-found-error-response.dto";

@Injectable()
export class disableOrEnableUserUseCase implements IUseCase<string, User> {
    constructor(
        @Inject("IUserRepository")
        private userRepository: IUserRepository
    ) {}

    async execute(uuid: string): Promise<User> {
        const UserEntity = await this.userRepository.findByUuid(uuid);
        if (!UserEntity) throw new NotFoundResponse("Sent User doesn't exist");

        UserEntity.status = !UserEntity.status;
        UserEntity.updated_at = new Date();

        await this.userRepository.update(UserEntity.id, UserEntity);
        return await this.userRepository.findById(UserEntity.id);
    }
}
