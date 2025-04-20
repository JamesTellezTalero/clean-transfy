import { Inject, Injectable } from "@nestjs/common";
import { User } from "../../domain/entities/user.entity";
import { IUserRepository } from "../../domain/repositories/user.respository.interface";
import { IUseCase } from "src/shared/domain/use-cases/use-case.interface";

@Injectable()
export class findByUuidUserUseCase implements IUseCase<string, User> {
    constructor(
        @Inject("IUserRepository")
        private userRepository: IUserRepository
    ) {}

    async execute(uuid: string): Promise<User> {
        return this.userRepository.findByUuid(uuid);
    }
}
