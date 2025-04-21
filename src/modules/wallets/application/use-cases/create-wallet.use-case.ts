import { Inject, Injectable } from "@nestjs/common";
import { IUseCase } from "src/shared/domain/use-cases/use-case.interface";
import { WalletCreateDatabaseDto } from "../dtos/wallet.create-database.dto";
import { Wallet } from "../../domain/entities/wallet.entity";
import { IWalletRepository } from "../../domain/repositories/wallet.respository.interface";
import { ConflictResponse } from "src/shared/application/dtos/api-responses/errors/conflict-error-response.dto";
import { IUserRepository } from "src/modules/users/domain/repositories/user.respository.interface";
import { IBankRepository } from "src/modules/banks/domain/repositories/bank.respository.interface";

@Injectable()
export class createWalletUseCase
    implements IUseCase<WalletCreateDatabaseDto, Wallet>
{
    constructor(
        @Inject("IWalletRepository")
        private walletRepository: IWalletRepository,
        @Inject("IUserRepository")
        private userRepository: IUserRepository,
        @Inject("IBankRepository")
        private bankRepository: IBankRepository
    ) {}

    async execute(createDto: WalletCreateDatabaseDto): Promise<Wallet> {
        const preExistuser = await this.userRepository.findById(
            createDto.user_id
        );
        const preExistBank = await this.bankRepository.findById(
            createDto.bank_id
        );
        const preExistWallet =
            await this.walletRepository.findByBankIdAndUserId(
                createDto.bank_id,
                createDto.user_id
            );
        if (!preExistuser)
            throw new ConflictResponse("Sent User doesn't exist");
        else if (!preExistBank)
            throw new ConflictResponse("Sent Bank doesn't exist");
        else if (preExistWallet)
            throw new ConflictResponse(
                "Sent User already has this Bank Wallet"
            );
        else return this.walletRepository.create(createDto);
    }
}
