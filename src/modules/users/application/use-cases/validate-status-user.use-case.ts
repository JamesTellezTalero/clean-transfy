import { Inject, Injectable } from "@nestjs/common";
import { IUseCase } from "src/shared/domain/use-cases/use-case.interface";
import { IUserRepository } from "../../domain/repositories/user.respository.interface";
import { NotFoundResponse } from "src/shared/application/dtos/api-responses/errors/not-found-error-response.dto";

@Injectable()
export class validateStatusUserUseCase implements IUseCase<string, boolean> {
    constructor(
        @Inject("IUserRepository")
        private userRepository: IUserRepository
    ) {}

    async execute(uuid: string): Promise<boolean> {
        const UserEntity = await this.userRepository.findByUuid(uuid);
        if (!UserEntity) throw new NotFoundResponse("Sent User doesn't exist");
        return UserEntity.status;
    }
}
