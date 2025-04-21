import { Inject, Injectable } from "@nestjs/common";
import { IUseCase } from "src/shared/domain/use-cases/use-case.interface";
import { ITopUpRepository } from "../../domain/repositories/top_up.respository.interface";
import { TopUp } from "../../domain/entities/top_up.entity";

@Injectable()
export class findByWalletIdTopUpUseCase implements IUseCase<number, TopUp[]> {
    constructor(
        @Inject("ITopUpRepository")
        private topUpRepository: ITopUpRepository
    ) {}

    async execute(wallet_id: number): Promise<TopUp[]> {
        return this.topUpRepository.findByWalletId(wallet_id);
    }
}
