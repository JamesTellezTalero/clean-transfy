import { Inject, Injectable } from "@nestjs/common";
import { IUseCase } from "src/shared/domain/use-cases/use-case.interface";
import { UserCreateDatabaseDto } from "../dtos/user.create-database.dto";
import { User } from "../../domain/entities/user.entity";
import { IUserRepository } from "../../domain/repositories/user.respository.interface";

@Injectable()
export class createUserUseCase
    implements IUseCase<UserCreateDatabaseDto, User>
{
    constructor(
        @Inject("IUserRepository")
        private userRepository: IUserRepository
    ) {}

    async execute(createDto: UserCreateDatabaseDto): Promise<User> {
        return this.userRepository.create(createDto);
    }
}
