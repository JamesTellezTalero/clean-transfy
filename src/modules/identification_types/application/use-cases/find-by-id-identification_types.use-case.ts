import { Inject, Injectable } from "@nestjs/common";
import { IUseCase } from "src/shared/domain/use-cases/use-case.interface";
import { IdentificationType } from "../../domain/entities/identification_type.entity";
import { IIdentificationTypeRepository } from "../../domain/repositories/identification_type.respository.interface";
@Injectable()
export class findByIdIdentificationTypeUseCase
    implements IUseCase<number, IdentificationType>
{
    constructor(
        @Inject("IIdentificationTypeRepository")
        private identificationTypeRepository: IIdentificationTypeRepository
    ) {}

    async execute(id: number): Promise<IdentificationType> {
        return this.identificationTypeRepository.findById(id);
    }
}
