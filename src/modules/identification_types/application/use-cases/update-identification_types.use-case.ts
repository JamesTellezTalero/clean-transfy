import { Inject, Injectable } from "@nestjs/common";
import { IUseCase } from "src/shared/domain/use-cases/use-case.interface";

import { NotFoundResponse } from "src/shared/application/dtos/api-responses/errors/not-found-error-response.dto";
import { IdentificationTypeUpdateDatabaseDto } from "../dtos/identification_type.update-database.dto";
import { IdentificationType } from "../../domain/entities/identification_type.entity";
import { IIdentificationTypeRepository } from "../../domain/repositories/identification_type.respository.interface";

@Injectable()
export class updateIdentificationTypeUseCase
    implements
        IUseCase<
            { id: number; dto: IdentificationTypeUpdateDatabaseDto },
            IdentificationType
        >
{
    constructor(
        @Inject("IIdentificationTypeRepository")
        private identificationTypeRepository: IIdentificationTypeRepository
    ) {}

    async execute(updateBody: {
        id: number;
        dto: IdentificationTypeUpdateDatabaseDto;
    }): Promise<IdentificationType> {
        const preExistIdentificationType =
            await this.identificationTypeRepository.findById(updateBody.id);
        if (!preExistIdentificationType)
            throw new NotFoundResponse(
                "Sent Identification Type doesn't exist"
            );
        else
            return this.identificationTypeRepository.update(
                updateBody.id,
                updateBody.dto
            );
    }
}
