import { Module } from "@nestjs/common";
import { WalletController } from "./presentation/controllers/wallet.controller";
import { WalletRepositoryService } from "./infrastructure/repositories/wallet.repository.service";
import { createWalletUseCase } from "./application/use-cases/create-wallet.use-case";
import { deleteWalletUseCase } from "./application/use-cases/delete-wallet.use-case";
import { updateWalletUseCase } from "./application/use-cases/update-wallet.use-case";
import { findByAllWalletUseCase } from "./application/use-cases/find-by-all-wallet.use-case";
import { findByIdWalletUseCase } from "./application/use-cases/find-by-id-wallet.use-case";
import { findByUuidWalletUseCase } from "./application/use-cases/find-by-uuid-wallet.use-case";
import { findByUserIdWalletUseCase } from "./application/use-cases/find-by-user-id-wallet.use-case";
import { findByBankIdWalletUseCase } from "./application/use-cases/find-by-bank-id-wallet.use-case";
import { TypeOrmModule } from "@nestjs/typeorm";
import { WalletORMEntity } from "./infrastructure/orm/wallet.orm-entity";
import { BankModule } from "../banks/bank.module";
import { UserModule } from "../users/user.module";

@Module({
    imports: [
        TypeOrmModule.forFeature([WalletORMEntity]),
        BankModule,
        UserModule
    ],
    controllers: [WalletController],
    providers: [
        {
            provide: "IWalletRepository",
            useClass: WalletRepositoryService
        },
        createWalletUseCase,
        deleteWalletUseCase,
        updateWalletUseCase,
        findByAllWalletUseCase,
        findByIdWalletUseCase,
        findByUuidWalletUseCase,
        findByUserIdWalletUseCase,
        findByBankIdWalletUseCase
    ],
    exports: ["IWalletRepository"]
})
export class WalletModule {}
