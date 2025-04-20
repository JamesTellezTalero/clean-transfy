import { Inject, Injectable } from "@nestjs/common";
import { IUserRepository } from "../../domain/repositories/user.respository.interface";
import { User } from "../../domain/entities/user.entity";
import { IUseCase } from "src/shared/domain/use-cases/use-case.interface";

@Injectable()
export class findByIdentificationNumberAndIdentificationTypeIdUserUseCase
    implements
        IUseCase<
            {
                document: string;
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
        document: string;
        identification_type_id: number;
    }): Promise<User> {
        return this.userRepository.findByIdentificationNumberAndIdentificationTypeId(
            findData.document,
            findData.identification_type_id
        );
    }
}
