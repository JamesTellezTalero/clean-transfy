import { BankCreateDatabaseDto } from "../../application/dtos/bank.create-database.dto";
import { BankUpdateDatabaseDto } from "../../application/dtos/bank.update-database.dto";
import { Bank } from "../entities/bank.entity";

export interface IBankRepository {
    findById(id: number): Promise<Bank>;
    findByName(name: string): Promise<Bank>;
    findByCode(code: string): Promise<Bank>;
    findAll(): Promise<Bank[]>;
    create(data: BankCreateDatabaseDto): Promise<Bank>;
    update(id: number, data: BankUpdateDatabaseDto): Promise<Bank>;
    delete(id: number): Promise<void>;
}
