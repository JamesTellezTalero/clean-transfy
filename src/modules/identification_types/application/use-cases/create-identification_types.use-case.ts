import { Inject, Injectable } from "@nestjs/common";
import { IUseCase } from "src/shared/domain/use-cases/use-case.interface";
import { ConflictResponse } from "src/shared/application/dtos/api-responses/errors/conflict-error-response.dto";
import { IIdentificationTypeRepository } from "../../domain/repositories/identification_type.respository.interface";
import { IdentificationType } from "../../domain/entities/identification_type.entity";
import { IdentificationTypeCreateDatabaseDto } from "../dtos/identification_type.create-database.dto";

@Injectable()
export class createIdentificationTypeUseCase
    implements IUseCase<IdentificationTypeCreateDatabaseDto, IdentificationType>
{
    constructor(
        @Inject("IIdentificationTypeRepository")
        private identificationTypeRepository: IIdentificationTypeRepository
    ) {}

    async execute(
        createDto: IdentificationTypeCreateDatabaseDto
    ): Promise<IdentificationType> {
        const preExistIdentificationTypeName =
            await this.identificationTypeRepository.findByName(createDto.name);
        const preExistIdentificationTypeCode =
            await this.identificationTypeRepository.findByCode(createDto.code);
        if (preExistIdentificationTypeName)
            throw new ConflictResponse(
                "Sent Identification Type name already exist"
            );
        else if (preExistIdentificationTypeCode)
            throw new ConflictResponse(
                "Sent Identification Type code already exist"
            );
        else return this.identificationTypeRepository.create(createDto);
    }
}
