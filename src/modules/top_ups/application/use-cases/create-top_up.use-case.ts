import { Inject, Injectable } from "@nestjs/common";
import { IUseCase } from "src/shared/domain/use-cases/use-case.interface";
import { ConflictResponse } from "src/shared/application/dtos/api-responses/errors/conflict-error-response.dto";
import { TopUpCreateDatabaseDto } from "../dtos/top_up.create-database.dto";
import { TopUp } from "../../domain/entities/top_up.entity";
import { ITopUpRepository } from "../../domain/repositories/top_up.respository.interface";
import { IWalletRepository } from "src/modules/wallets/domain/repositories/wallet.respository.interface";
import { NotFoundResponse } from "src/shared/application/dtos/api-responses/errors/not-found-error-response.dto";

@Injectable()
export class createTopUpUseCase
    implements IUseCase<TopUpCreateDatabaseDto, TopUp>
{
    constructor(
        @Inject("ITopUpRepository")
        private topUpRepository: ITopUpRepository,
        @Inject("IWalletRepository")
        private walletRepository: IWalletRepository
    ) {}

    async execute(createDto: TopUpCreateDatabaseDto): Promise<TopUp> {
        const wallet = await this.walletRepository.findById(
            createDto.wallet_id
        );

        if (!wallet || !wallet.status)
            throw new NotFoundResponse("Wallet not found or inactive");

        const newTopUp = await this.topUpRepository.create(createDto);

        wallet.balance += createDto.amount;
        wallet.updated_at = new Date();
        await this.walletRepository.update(wallet.id, wallet);

        return newTopUp;
    }
}
