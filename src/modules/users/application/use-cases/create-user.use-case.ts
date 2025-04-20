import { Inject, Injectable } from "@nestjs/common";
import { IUseCase } from "src/shared/domain/use-cases/use-case.interface";
import { UserCreateDatabaseDto } from "../dtos/user.create-database.dto";
import { User } from "../../domain/entities/user.entity";
import { IUserRepository } from "../../domain/repositories/user.respository.interface";
import { ConflictResponse } from "src/shared/application/dtos/api-responses/errors/conflict-error-response.dto";
import { HashUtils } from "src/shared/infrastructure/utils/hash.utils";

@Injectable()
export class createUserUseCase
    implements IUseCase<UserCreateDatabaseDto, User>
{
    constructor(
        @Inject("IUserRepository")
        private userRepository: IUserRepository
    ) {}

    async execute(createDto: UserCreateDatabaseDto): Promise<User> {
        const UserEmailPrevExistence = await this.userRepository.findByEmail(
            createDto.email
        );

        if (UserEmailPrevExistence)
            throw new ConflictResponse(
                `Email ${UserEmailPrevExistence.email} presents previous Existence`
            );

        const UserUsernamePrevExistence =
            await this.userRepository.findByUsername(createDto.username);

        if (UserUsernamePrevExistence)
            throw new ConflictResponse(
                `Username ${UserUsernamePrevExistence.username} presents previous Existence`
            );

        const UserDocumentAndIdentificationTypePrevExistence =
            await this.userRepository.findByIdentificationNumberAndIdentificationTypeId(
                createDto.identification_number,
                createDto.identification_type_id
            );

        if (UserDocumentAndIdentificationTypePrevExistence)
            throw new ConflictResponse(
                `Document ${UserDocumentAndIdentificationTypePrevExistence.identification_number} with Document Type Id ${UserDocumentAndIdentificationTypePrevExistence.identification_type_id} presents previous Existence`
            );

        createDto.password = await HashUtils.hashPassword(createDto.password);

        return this.userRepository.create(createDto);
    }
}
