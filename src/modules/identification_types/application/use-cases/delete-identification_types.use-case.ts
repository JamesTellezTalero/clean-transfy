import { Inject, Injectable } from "@nestjs/common";
import { IUseCase } from "src/shared/domain/use-cases/use-case.interface";
import { NotFoundResponse } from "src/shared/application/dtos/api-responses/errors/not-found-error-response.dto";
import { IIdentificationTypeRepository } from "../../domain/repositories/identification_type.respository.interface";

@Injectable()
export class deleteIdentificationTypeUseCase implements IUseCase<number, void> {
    constructor(
        @Inject("IIdentificationTypeRepository")
        private identificationTypeRepository: IIdentificationTypeRepository
    ) {}

    async execute(id: number): Promise<void> {
        const preExistIdentificationType =
            await this.identificationTypeRepository.findById(id);
        if (!preExistIdentificationType)
            throw new NotFoundResponse(
                "Sent Identification Type doesn't exist"
            );
        else return this.identificationTypeRepository.delete(id);
    }
}
