import { Inject, Injectable } from "@nestjs/common";
import { IUseCase } from "src/shared/domain/use-cases/use-case.interface";
import { NotFoundResponse } from "src/shared/application/dtos/api-responses/errors/not-found-error-response.dto";
import { IWalletRepository } from "../../domain/repositories/wallet.respository.interface";
import { IUserRepository } from "src/modules/users/domain/repositories/user.respository.interface";

@Injectable()
export class deleteWalletUseCase
    implements IUseCase<{ wallet_uuid: string; user_uuid: string }, void>
{
    constructor(
        @Inject("IWalletRepository")
        private walletRepository: IWalletRepository,
        @Inject("IUserRepository")
        private userRepository: IUserRepository
    ) {}

    async execute(body: {
        wallet_uuid: string;
        user_uuid: string;
    }): Promise<void> {
        const preExistWallet = await this.walletRepository.findByUuid(
            body?.wallet_uuid
        );
        if (!preExistWallet)
            throw new NotFoundResponse("Sent Wallet doesn't exist");

        const preExistuser = await this.userRepository.findByUuid(
            body.user_uuid
        );
        if (!preExistuser)
            throw new NotFoundResponse("Sent User doesn't exist");
        else if (preExistuser.id !== preExistWallet.user_id)
            throw new NotFoundResponse("Sent Wallet doesn't belong to User");
        else return this.walletRepository.delete(preExistWallet.id);
    }
}
