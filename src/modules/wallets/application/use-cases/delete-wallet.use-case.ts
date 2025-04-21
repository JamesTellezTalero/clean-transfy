import { Inject, Injectable } from "@nestjs/common";
import { IUseCase } from "src/shared/domain/use-cases/use-case.interface";
import { NotFoundResponse } from "src/shared/application/dtos/api-responses/errors/not-found-error-response.dto";
import { IWalletRepository } from "../../domain/repositories/wallet.respository.interface";

@Injectable()
export class deleteWalletUseCase implements IUseCase<number, void> {
    constructor(
        @Inject("IWalletRepository")
        private walletRepository: IWalletRepository
    ) {}

    async execute(id: number): Promise<void> {
        const preExistWallet = await this.walletRepository.findById(id);
        if (!preExistWallet)
            throw new NotFoundResponse("Sent Wallet doesn't exist");
        else return this.walletRepository.delete(id);
    }
}
