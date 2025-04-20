import { Inject, Injectable } from "@nestjs/common";
import { User } from "../../domain/entities/user.entity";
import { IUseCase } from "src/shared/domain/use-cases/use-case.interface";
import { IUserRepository } from "../../domain/repositories/user.respository.interface";

@Injectable()
export class findByEmailUserUseCase implements IUseCase<string, User> {
    constructor(
        @Inject("IUserRepository")
        private userRepository: IUserRepository
    ) {}

    async execute(email: string): Promise<User> {
        return this.userRepository.findByEmail(email);
    }
}
