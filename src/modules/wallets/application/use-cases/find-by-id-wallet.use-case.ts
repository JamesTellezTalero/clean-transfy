import { Inject, Injectable } from "@nestjs/common";
import { IUseCase } from "src/shared/domain/use-cases/use-case.interface";
import { Wallet } from "../../domain/entities/wallet.entity";
import { IWalletRepository } from "../../domain/repositories/wallet.respository.interface";

@Injectable()
export class findByIdWalletUseCase implements IUseCase<number, Wallet> {
    constructor(
        @Inject("IWalletRepository")
        private walletRepository: IWalletRepository
    ) {}

    async execute(id: number): Promise<Wallet> {
        return this.walletRepository.findById(id);
    }
}
