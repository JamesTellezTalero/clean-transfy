import { Inject, Injectable } from "@nestjs/common";
import { IUseCase } from "src/shared/domain/use-cases/use-case.interface";
import { Transfer } from "../../domain/entities/transfer.entity";
import { ITransferRepository } from "../../domain/repositories/transfer.respository.interface";

@Injectable()
export class findBySourceWalletIdTransferUseCase
    implements IUseCase<number, Transfer[]>
{
    constructor(
        @Inject("ITransferRepository")
        private transferRepository: ITransferRepository
    ) {}

    async execute(source_wallet_id: number): Promise<Transfer[]> {
        return this.transferRepository.findBySourceWalletId(source_wallet_id);
    }
}
