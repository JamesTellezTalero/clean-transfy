import { TransferCreateDatabaseDto } from "../../application/dtos/transfer.create-database.dto";
import { Transfer } from "../entities/transfer.entity";

export interface ITransferRepository {
    findById(id: number): Promise<Transfer>;
    findBySourceWalletId(source_wallet_id: number): Promise<Transfer[]>;
    findByTargetWalletId(target_wallet_id: number): Promise<Transfer[]>;
    findAll(): Promise<Transfer[]>;
    create(data: TransferCreateDatabaseDto): Promise<Transfer>;
}
