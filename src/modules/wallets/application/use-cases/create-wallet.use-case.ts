import { Inject, Injectable } from "@nestjs/common";
import { IUseCase } from "src/shared/domain/use-cases/use-case.interface";
import { WalletCreateDatabaseDto } from "../dtos/wallet.create-database.dto";
import { Wallet } from "../../domain/entities/wallet.entity";
import { IWalletRepository } from "../../domain/repositories/wallet.respository.interface";
import { ConflictResponse } from "src/shared/application/dtos/api-responses/errors/conflict-error-response.dto";
import { IUserRepository } from "src/modules/users/domain/repositories/user.respository.interface";
import { IBankRepository } from "src/modules/banks/domain/repositories/bank.respository.interface";
import { NotFoundResponse } from "src/shared/application/dtos/api-responses/errors/not-found-error-response.dto";

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

    async execute(dto: WalletCreateDatabaseDto): Promise<Wallet> {
        const preExistuser = await this.userRepository.findByUuid(
            dto.user_uuid
        );
        const preExistBank = await this.bankRepository.findById(dto.bank_id);
        if (!preExistuser)
            throw new NotFoundResponse("Sent User doesn't exist");
        else if (!preExistBank)
            throw new NotFoundResponse("Sent Bank doesn't exist");

        const preExistWallet =
            await this.walletRepository.findByBankIdAndUserId(
                dto.bank_id,
                preExistuser?.id
            );

        dto.user_id = preExistuser.id;

        if (preExistWallet)
            throw new ConflictResponse(
                "Sent User already has this Bank Wallet"
            );
        else return this.walletRepository.create(dto);
    }
}
