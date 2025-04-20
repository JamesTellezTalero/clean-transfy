import { Inject, Injectable } from "@nestjs/common";
import { User } from "../../domain/entities/user.entity";
import { IUserRepository } from "../../domain/repositories/user.respository.interface";
import { IUseCase } from "src/shared/domain/use-cases/use-case.interface";

@Injectable()
export class findAllUserUseCase implements IUseCase<null, User[]> {
    constructor(
        @Inject("IUserRepository")
        private userRepository: IUserRepository
    ) {}

    async execute(): Promise<User[]> {
        return this.userRepository.findAll();
    }
}
