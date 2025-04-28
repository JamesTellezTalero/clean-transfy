import { Inject, Injectable } from "@nestjs/common";
import { User } from "../../domain/entities/user.entity";
import { UserUpdateDatabaseDto } from "../dtos/user.update-database.dto";
import { IUseCase } from "src/shared/domain/use-cases/use-case.interface";
import { IUserRepository } from "../../domain/repositories/user.respository.interface";
import { NotFoundResponse } from "src/shared/application/dtos/api-responses/errors/not-found-error-response.dto";

@Injectable()
export class updateUserUseCase
    implements
        IUseCase<{ uuid: string; updateDto: UserUpdateDatabaseDto }, User>
{
    constructor(
        @Inject("IUserRepository")
        private userRepository: IUserRepository
    ) {}

    async execute(updateBody: {
        uuid: string;
        updateDto: UserUpdateDatabaseDto;
    }): Promise<User> {
        const preExistUser = await this.userRepository.findByUuid(
            updateBody.uuid
        );
        if (!preExistUser)
            throw new NotFoundResponse("Sent User doesn't exist");
        else
            return this.userRepository.update(
                preExistUser.id,
                updateBody.updateDto
            );
    }
}
