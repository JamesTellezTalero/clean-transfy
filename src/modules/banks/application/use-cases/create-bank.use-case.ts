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
        const preExistBankName = await this.bankRepository.findByName(
            createDto.name
        );
        const preExistBankCode = await this.bankRepository.findByCode(
            createDto.code
        );
        if (preExistBankName)
            throw new ConflictResponse("Sent Bank name already exist");
        else if (preExistBankCode)
            throw new ConflictResponse("Sent Bank code already exist");
        else return this.bankRepository.create(createDto);
    }
}
