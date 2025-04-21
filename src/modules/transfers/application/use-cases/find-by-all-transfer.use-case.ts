import { Inject, Injectable } from "@nestjs/common";
import { IUseCase } from "src/shared/domain/use-cases/use-case.interface";
import { Transfer } from "../../domain/entities/transfer.entity";
import { ITransferRepository } from "../../domain/repositories/transfer.respository.interface";

@Injectable()
export class findByAllTransferUseCase implements IUseCase<null, Transfer[]> {
    constructor(
        @Inject("ITransferRepository")
        private transferRepository: ITransferRepository
    ) {}

    async execute(): Promise<Transfer[]> {
        return this.transferRepository.findAll();
    }
}
