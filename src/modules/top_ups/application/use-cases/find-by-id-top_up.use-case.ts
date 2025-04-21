import { Inject, Injectable } from "@nestjs/common";
import { IUseCase } from "src/shared/domain/use-cases/use-case.interface";
import { ITopUpRepository } from "../../domain/repositories/top_up.respository.interface";
import { TopUp } from "../../domain/entities/top_up.entity";

@Injectable()
export class findByIdTopUpUseCase implements IUseCase<number, TopUp> {
    constructor(
        @Inject("ITopUpRepository")
        private topUpRepository: ITopUpRepository
    ) {}

    async execute(id: number): Promise<TopUp> {
        return this.topUpRepository.findById(id);
    }
}
