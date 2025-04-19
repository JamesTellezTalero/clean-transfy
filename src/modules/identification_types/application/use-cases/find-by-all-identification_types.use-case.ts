import { Inject, Injectable } from "@nestjs/common";
import { IUseCase } from "src/shared/domain/use-cases/use-case.interface";
import { IIdentificationTypeRepository } from "../../domain/repositories/identification_type.respository.interface";
import { IdentificationType } from "../../domain/entities/identification_type.entity";
@Injectable()
export class findByAllIdentificationTypeUseCase
    implements IUseCase<null, IdentificationType[]>
{
    constructor(
        @Inject("IIdentificationTypeRepository")
        private identificationTypeRepository: IIdentificationTypeRepository
    ) {}

    async execute(): Promise<IdentificationType[]> {
        return this.identificationTypeRepository.findAll();
    }
}
