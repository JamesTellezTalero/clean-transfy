import { Inject, Injectable } from "@nestjs/common";
import { IUseCase } from "src/shared/domain/use-cases/use-case.interface";
import { NotFoundResponse } from "src/shared/application/dtos/api-responses/errors/not-found-error-response.dto";
import { TransferCreateDatabaseDto } from "../dtos/transfer.create-database.dto";
import { Transfer } from "../../domain/entities/transfer.entity";
import { ITransferRepository } from "../../domain/repositories/transfer.respository.interface";
import { IWalletRepository } from "src/modules/wallets/domain/repositories/wallet.respository.interface";
import { ConflictResponse } from "src/shared/application/dtos/api-responses/errors/conflict-error-response.dto";

@Injectable()
export class createTransferUseCase
    implements IUseCase<TransferCreateDatabaseDto, Transfer>
{
    constructor(
        @Inject("ITransferRepository")
        private transferRepository: ITransferRepository,

        @Inject("IWalletRepository")
        private walletRepository: IWalletRepository
    ) {}

    async execute(createDto: TransferCreateDatabaseDto): Promise<Transfer> {
        const sourceWallet = await this.walletRepository.findById(
            createDto.source_wallet_id
        );

        const targetWallet = await this.walletRepository.findById(
            createDto.target_wallet_id
        );

        if (!sourceWallet || !sourceWallet.status)
            throw new NotFoundResponse("Source Wallet not found or inactive");
        else if (!targetWallet || !targetWallet.status)
            throw new NotFoundResponse("Target Wallet not found or inactive");
        else if (sourceWallet.balance < createDto.amount)
            throw new ConflictResponse("Insufficient funds in source wallet");
        else if (createDto.source_wallet_id === createDto.target_wallet_id)
            throw new ConflictResponse("Cannot transfer to the same wallet");

        const newTransfer = await this.transferRepository.create(createDto);

        sourceWallet.balance =
            Number(sourceWallet.balance) - Number(createDto.amount);
        sourceWallet.updated_at = new Date();
        await this.walletRepository.update(sourceWallet.id, sourceWallet);

        targetWallet.balance =
            Number(targetWallet.balance) + Number(createDto.amount);
        targetWallet.updated_at = new Date();
        await this.walletRepository.update(targetWallet.id, targetWallet);

        return newTransfer;
    }
}
