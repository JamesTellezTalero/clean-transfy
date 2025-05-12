import { Module } from "@nestjs/common";
import { TransferController } from "./presentation/controllers/transfer.controller";
import { TransferRepositoryService } from "./infrastructure/repositories/transfer.repository.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { TransferORMEntity } from "./infrastructure/orm/transfer.orm-entity";
import { createTransferUseCase } from "./application/use-cases/create-transfer.use-case";
import { findAllTransferUseCase } from "./application/use-cases/find-all-transfer.use-case";
import { findByIdTransferUseCase } from "./application/use-cases/find-by-id-transfer.use-case";
import { findBySourceWalletIdTransferUseCase } from "./application/use-cases/find-by-source-wallet-id-transfer.use-case";
import { findByTargetWalletIdTransferUseCase } from "./application/use-cases/find-by-target-wallet-id-transfer.use-case";
import { WalletModule } from "../wallets/wallet.module";
import { UserModule } from "../users/user.module";

@Module({
    imports: [
        TypeOrmModule.forFeature([TransferORMEntity]),
        WalletModule,
        UserModule
    ],
    controllers: [TransferController],
    providers: [
        {
            provide: "ITransferRepository",
            useClass: TransferRepositoryService
        },
        createTransferUseCase,
        findAllTransferUseCase,
        findByIdTransferUseCase,
        findBySourceWalletIdTransferUseCase,
        findByTargetWalletIdTransferUseCase
    ]
})
export class TransferModule {}
