import { Inject, Injectable } from "@nestjs/common";
import { IUseCase } from "src/shared/domain/use-cases/use-case.interface";
import { NotFoundResponse } from "src/shared/application/dtos/api-responses/errors/not-found-error-response.dto";
import { TransferCreateDatabaseDto } from "../dtos/transfer.create-database.dto";
import { Transfer } from "../../domain/entities/transfer.entity";
import { ITransferRepository } from "../../domain/repositories/transfer.respository.interface";
import { IWalletRepository } from "src/modules/wallets/domain/repositories/wallet.respository.interface";
import { ConflictResponse } from "src/shared/application/dtos/api-responses/errors/conflict-error-response.dto";
import { IUserRepository } from "src/modules/users/domain/repositories/user.respository.interface";

@Injectable()
export class createTransferUseCase
    implements IUseCase<TransferCreateDatabaseDto, Transfer>
{
    constructor(
        @Inject("ITransferRepository")
        private transferRepository: ITransferRepository,

        @Inject("IWalletRepository")
        private walletRepository: IWalletRepository,

        @Inject("IUserRepository")
        private userRepository: IUserRepository
    ) {}

    async execute(createDto: TransferCreateDatabaseDto): Promise<Transfer> {
        const sourceWallet = await this.walletRepository.findByUuid(
            createDto.source_wallet_uuid
        );

        const targetWallet = await this.walletRepository.findByUuid(
            createDto.target_wallet_uuid
        );

        if (!sourceWallet || !sourceWallet.status)
            throw new NotFoundResponse("Source Wallet not found or inactive");
        else if (!targetWallet || !targetWallet.status)
            throw new NotFoundResponse("Target Wallet not found or inactive");
        else if (sourceWallet.balance < createDto.amount)
            throw new ConflictResponse("Insufficient funds in source wallet");
        else if (createDto.source_wallet_uuid === createDto.target_wallet_uuid)
            throw new ConflictResponse("Cannot transfer to the same wallet");

        const preExistuser = await this.userRepository.findByUuid(
            createDto.user_uuid
        );
        if (!preExistuser)
            throw new NotFoundResponse("Sent User doesn't exist");
        else if (preExistuser.id !== sourceWallet.user_id)
            throw new NotFoundResponse(
                "Sent Source Wallet doesn't belong to User"
            );

        createDto.source_wallet_id = sourceWallet.id;
        createDto.target_wallet_id = targetWallet.id;

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
