import { Inject, Injectable } from "@nestjs/common";
import { IUserRepository } from "../../domain/repositories/user.respository.interface";
import { IUseCase } from "src/shared/domain/use-cases/use-case.interface";
import { User } from "../../domain/entities/user.entity";

@Injectable()
export class findByUsernameUserUseCase implements IUseCase<string, User> {
    constructor(
        @Inject("IUserRepository")
        private userRepository: IUserRepository
    ) {}

    async execute(username: string): Promise<User> {
        return this.userRepository.findByUsername(username);
    }
}
