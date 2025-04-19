import { Module } from "@nestjs/common";
import { BankController } from "./presentation/controllers/bank.controller";
import { BankRepositoryService } from "./infrastructure/repositories/bank.repository.service";
import { createBankUseCase } from "./application/use-cases/create-bank.use-case";
import { deleteBankUseCase } from "./application/use-cases/delete-bank.use-case";
import { updateBankUseCase } from "./application/use-cases/update-bank.use-case";
import { findByAllBankUseCase } from "./application/use-cases/find-by-all-bank.use-case";
import { findByIdBankUseCase } from "./application/use-cases/find-by-id-bank.use-case";
import { findByNameBankUseCase } from "./application/use-cases/find-by-name-bank.use-case";
import { findByCodeBankUseCase } from "./application/use-cases/find-by-code-bank.use-case";
import { TypeOrmModule } from "@nestjs/typeorm";
import { BankORMEntity } from "./infrastructure/orm/bank.orm-entity";

@Module({
    imports: [TypeOrmModule.forFeature([BankORMEntity])],
    controllers: [BankController],
    providers: [
        {
            provide: "IBankRepository",
            useClass: BankRepositoryService
        },
        createBankUseCase,
        deleteBankUseCase,
        updateBankUseCase,
        findByAllBankUseCase,
        findByIdBankUseCase,
        findByNameBankUseCase,
        findByCodeBankUseCase
    ]
})
export class BankModule {}
