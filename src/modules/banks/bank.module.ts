import { Module } from "@nestjs/common";
import { BankController } from "./presentation/controllers/bank.controller";
import { BankRepositoryService } from "./infrastructure/repositories/bank.repository.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { BankORMEntity } from "./infrastructure/orm/bank.orm-entity";
import { CreateBankUseCase } from "./application/use-cases/create-bank.use-case";
import { DeleteBankUseCase } from "./application/use-cases/delete-bank.use-case";
import { UpdateBankUseCase } from "./application/use-cases/update-bank.use-case";
import { FindAllBanksUseCase } from "./application/use-cases/find-all-bank.use-case";
import { FindBankByIdUseCase } from "./application/use-cases/find-by-id-bank.use-case";
import { FindBankByNameUseCase } from "./application/use-cases/find-by-name-bank.use-case";
import { FindBankByCodeUseCase } from "./application/use-cases/find-by-code-bank.use-case";

@Module({
    imports: [TypeOrmModule.forFeature([BankORMEntity])],
    controllers: [BankController],
    providers: [
        {
            provide: "IBankRepository",
            useClass: BankRepositoryService
        },
        CreateBankUseCase,
        DeleteBankUseCase,
        UpdateBankUseCase,
        FindAllBanksUseCase,
        FindBankByIdUseCase,
        FindBankByNameUseCase,
        FindBankByCodeUseCase
    ],
    exports: ["IBankRepository"]
})
export class BankModule {}
