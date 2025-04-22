import { Module } from "@nestjs/common";
import { TopUpController } from "./presentation/controllers/top_up.controller";
import { TopUpRepositoryService } from "./infrastructure/repositories/top_up.repository.service";
import { WalletModule } from "../wallets/wallet.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { TopUpORMEntity } from "./infrastructure/orm/top_up.orm-entity";
import { createTopUpUseCase } from "./application/use-cases/create-top_up.use-case";
import { findByAllTopUpUseCase } from "./application/use-cases/find-by-all-top_up.use-case";
import { findByIdTopUpUseCase } from "./application/use-cases/find-by-id-top_up.use-case";
import { findByWalletIdTopUpUseCase } from "./application/use-cases/find-by-wallet-id-top_up.use-case";
import { UserModule } from "../users/user.module";

@Module({
    imports: [
        TypeOrmModule.forFeature([TopUpORMEntity]),
        WalletModule,
        UserModule
    ],
    controllers: [TopUpController],
    providers: [
        {
            provide: "ITopUpRepository",
            useClass: TopUpRepositoryService
        },
        createTopUpUseCase,
        findByAllTopUpUseCase,
        findByIdTopUpUseCase,
        findByWalletIdTopUpUseCase
    ]
})
export class TopUpModule {}
