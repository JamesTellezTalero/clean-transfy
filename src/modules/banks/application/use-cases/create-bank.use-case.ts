import { Inject, Injectable } from "@nestjs/common";
import { IUseCase } from "src/shared/domain/use-cases/use-case.interface";
import { IBankRepository } from "../../domain/repositories/bank.respository.interface";
import { BankCreateDatabaseDto } from "../dtos/bank.create-database.dto";
import { Bank } from "../../domain/entities/bank.entity";
import { ConflictResponse } from "src/shared/application/dtos/api-responses/errors/conflict-error-response.dto";

@Injectable()
export class createBankUseCase
    implements IUseCase<BankCreateDatabaseDto, Bank>
{
    constructor(
        @Inject("IBankRepository")
        private bankRepository: IBankRepository
    ) {}

    async execute(createDto: BankCreateDatabaseDto): Promise<Bank> {
        const preExistBank = await this.bankRepository.findByName(
            createDto.name
        );
        if (preExistBank) throw new ConflictResponse("Sent Bank already exist");
        else return this.bankRepository.create(createDto);
    }
}
