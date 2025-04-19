import { Inject, Injectable } from "@nestjs/common";
import { IUseCase } from "src/shared/domain/use-cases/use-case.interface";
import { IBankRepository } from "../../domain/repositories/bank.respository.interface";
import { BankUpdateDatabaseDto } from "../dtos/bank.update-database.dto";
import { Bank } from "../../domain/entities/bank.entity";
import { NotFoundResponse } from "src/shared/application/dtos/api-responses/errors/not-found-error-response.dto";

@Injectable()
export class findByIdBankUseCase implements IUseCase<number, Bank> {
    constructor(
        @Inject("IBankRepository")
        private bankRepository: IBankRepository
    ) {}

    async execute(id: number): Promise<Bank> {
        return this.bankRepository.findById(id);
    }
}
