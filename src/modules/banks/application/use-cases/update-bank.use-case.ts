import { Inject, Injectable } from "@nestjs/common";
import { IUseCase } from "src/shared/domain/use-cases/use-case.interface";
import { IBankRepository } from "../../domain/repositories/bank.respository.interface";
import { BankUpdateDatabaseDto } from "../dtos/bank.update-database.dto";
import { Bank } from "../../domain/entities/bank.entity";
import { NotFoundResponse } from "src/shared/application/dtos/api-responses/errors/not-found-error-response.dto";

@Injectable()
export class updateBankUseCase
    implements IUseCase<{ id: number; dto: BankUpdateDatabaseDto }, Bank>
{
    constructor(
        @Inject("IBankRepository")
        private bankRepository: IBankRepository
    ) {}

    async execute(updateBody: {
        id: number;
        dto: BankUpdateDatabaseDto;
    }): Promise<Bank> {
        const preExistBank = await this.bankRepository.findById(updateBody.id);
        if (!preExistBank)
            throw new NotFoundResponse("Sent Bank doesn't exist");
        else return this.bankRepository.update(updateBody.id, updateBody.dto);
    }
}
