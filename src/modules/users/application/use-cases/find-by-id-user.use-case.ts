import { Inject, Injectable } from "@nestjs/common";
import { IUserRepository } from "../../domain/repositories/user.respository.interface";
import { IUseCase } from "src/shared/domain/use-cases/use-case.interface";
import { User } from "../../domain/entities/user.entity";

@Injectable()
export class findByIdUserUseCase implements IUseCase<number, User> {
    constructor(
        @Inject("IUserRepository")
        private userRepository: IUserRepository
    ) {}

    async execute(id: number): Promise<User> {
        return this.userRepository.findById(id);
    }
}
