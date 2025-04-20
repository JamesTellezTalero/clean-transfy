import { Inject, Injectable } from "@nestjs/common";
import { IUserRepository } from "../../domain/repositories/user.respository.interface";
import { IUseCase } from "src/shared/domain/use-cases/use-case.interface";
import { NotFoundResponse } from "src/shared/application/dtos/api-responses/errors/not-found-error-response.dto";

@Injectable()
export class deleteUserUseCase implements IUseCase<number, void> {
    constructor(
        @Inject("IUserRepository")
        private userRepository: IUserRepository
    ) {}

    async execute(id: number): Promise<void> {
        const preExistUser = await this.userRepository.findById(id);
        if (!preExistUser)
            throw new NotFoundResponse("Sent User doesn't exist");
        else return this.userRepository.delete(id);
    }
}
