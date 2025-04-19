import { Inject, Injectable } from "@nestjs/common";
import { IUseCase } from "src/shared/domain/use-cases/use-case.interface";
import { IBankRepository } from "../../domain/repositories/bank.respository.interface";
import { BankUpdateDatabaseDto } from "../dtos/bank.update-database.dto";
import { Bank } from "../../domain/entities/bank.entity";
import { NotFoundResponse } from "src/shared/application/dtos/api-responses/errors/not-found-error-response.dto";

@Injectable()
export class findByNameBankUseCase implements IUseCase<string, Bank> {
    constructor(
        @Inject("IBankRepository")
        private bankRepository: IBankRepository
    ) {}

    async execute(name: string): Promise<Bank> {
        return this.bankRepository.findByName(name);
    }
}
