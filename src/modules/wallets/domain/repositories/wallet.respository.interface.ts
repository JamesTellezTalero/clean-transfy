import { WalletCreateDatabaseDto } from "../../application/dtos/wallet.create-database.dto";
import { WalletUpdateDatabaseDto } from "../../application/dtos/wallet.update-database.dto";
import { Wallet } from "../entities/wallet.entity";

export interface IWalletRepository {
    findById(id: number): Promise<Wallet>;
    findByUuid(uuid: string): Promise<Wallet>;
    findByUserId(user_id: number): Promise<Wallet[]>;
    findByBankId(bank_id: number): Promise<Wallet[]>;
    findByBankIdAndUserId(bank_id: number, user_id: number): Promise<Wallet>;
    findAll(): Promise<Wallet[]>;
    create(data: WalletCreateDatabaseDto): Promise<Wallet>;
    update(id: number, data: WalletUpdateDatabaseDto): Promise<Wallet>;
    delete(id: number): Promise<void>;
}
