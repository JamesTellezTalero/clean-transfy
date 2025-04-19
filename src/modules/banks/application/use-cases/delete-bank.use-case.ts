import { Inject, Injectable } from "@nestjs/common";
import { IUseCase } from "src/shared/domain/use-cases/use-case.interface";
import { IBankRepository } from "../../domain/repositories/bank.respository.interface";
import { NotFoundResponse } from "src/shared/application/dtos/api-responses/errors/not-found-error-response.dto";

@Injectable()
export class deleteBankUseCase implements IUseCase<number, void> {
    constructor(
        @Inject("IBankRepository")
        private bankRepository: IBankRepository
    ) {}

    async execute(id: number): Promise<void> {
        const preExistBank = await this.bankRepository.findById(id);
        if (!preExistBank)
            throw new NotFoundResponse("Sent Bank doesn't exist");
        else return this.bankRepository.delete(id);
    }
}
