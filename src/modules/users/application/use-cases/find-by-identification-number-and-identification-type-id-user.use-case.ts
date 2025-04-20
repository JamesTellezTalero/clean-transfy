import { Inject, Injectable } from "@nestjs/common";
import { IUserRepository } from "../../domain/repositories/user.respository.interface";
import { User } from "../../domain/entities/user.entity";
import { IUseCase } from "src/shared/domain/use-cases/use-case.interface";

@Injectable()
export class findByIdentificationNumberAndIdentificationTypeIdUserUseCase
    implements
        IUseCase<
            {
                identification_number: string;
                identification_type_id: number;
            },
            User
        >
{
    constructor(
        @Inject("IUserRepository")
        private userRepository: IUserRepository
    ) {}

    async execute(findData: {
        identification_number: string;
        identification_type_id: number;
    }): Promise<User> {
        return this.userRepository.findByIdentificationNumberAndIdentificationTypeId(
            findData.identification_number,
            findData.identification_type_id
        );
    }
}
