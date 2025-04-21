import { Inject, Injectable } from "@nestjs/common";
import { IUseCase } from "src/shared/domain/use-cases/use-case.interface";

import { NotFoundResponse } from "src/shared/application/dtos/api-responses/errors/not-found-error-response.dto";
import { IWalletRepository } from "../../domain/repositories/wallet.respository.interface";
import { Wallet } from "../../domain/entities/wallet.entity";
import { WalletUpdateDatabaseDto } from "../dtos/wallet.update-database.dto";

@Injectable()
export class updateWalletUseCase
    implements IUseCase<{ id: number; dto: WalletUpdateDatabaseDto }, Wallet>
{
    constructor(
        @Inject("IWalletRepository")
        private walletRepository: IWalletRepository
    ) {}

    async execute(updateBody: {
        id: number;
        dto: WalletUpdateDatabaseDto;
    }): Promise<Wallet> {
        const preExistWallet = await this.walletRepository.findById(
            updateBody.id
        );
        if (!preExistWallet)
            throw new NotFoundResponse("Sent Wallet doesn't exist");
        else return this.walletRepository.update(updateBody.id, updateBody.dto);
    }
}
