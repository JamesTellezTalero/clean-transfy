import { Inject, Injectable } from "@nestjs/common";
import { IUseCase } from "src/shared/domain/use-cases/use-case.interface";
import { ConflictResponse } from "src/shared/application/dtos/api-responses/errors/conflict-error-response.dto";
import { TopUpCreateDatabaseDto } from "../dtos/top_up.create-database.dto";
import { TopUp } from "../../domain/entities/top_up.entity";
import { ITopUpRepository } from "../../domain/repositories/top_up.respository.interface";
import { IWalletRepository } from "src/modules/wallets/domain/repositories/wallet.respository.interface";
import { NotFoundResponse } from "src/shared/application/dtos/api-responses/errors/not-found-error-response.dto";
import { IUserRepository } from "src/modules/users/domain/repositories/user.respository.interface";

@Injectable()
export class createTopUpUseCase
    implements IUseCase<TopUpCreateDatabaseDto, TopUp>
{
    constructor(
        @Inject("ITopUpRepository")
        private topUpRepository: ITopUpRepository,
        @Inject("IWalletRepository")
        private walletRepository: IWalletRepository,
        @Inject("IUserRepository")
        private userRepository: IUserRepository
    ) {}

    async execute(createDto: TopUpCreateDatabaseDto): Promise<TopUp> {
        const wallet = await this.walletRepository.findByUuid(
            createDto.wallet_uuid
        );

        if (!wallet || !wallet.status)
            throw new NotFoundResponse("Wallet not found or inactive");

        const preExistuser = await this.userRepository.findByUuid(
            createDto.user_uuid
        );
        if (!preExistuser)
            throw new NotFoundResponse("Sent User doesn't exist");
        else if (preExistuser.id !== wallet.user_id)
            throw new NotFoundResponse("Sent Wallet doesn't belong to User");

        createDto.wallet_id = wallet.id;

        const newTopUp = await this.topUpRepository.create(createDto);

        wallet.balance = Number(wallet.balance) + Number(createDto.amount);
        wallet.updated_at = new Date();
        await this.walletRepository.update(wallet.id, wallet);

        return newTopUp;
    }
}
