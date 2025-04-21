import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { WalletORMEntity } from "../orm/wallet.orm-entity";
import { Repository } from "typeorm";
import { Wallet } from "../../domain/entities/wallet.entity";
import { IWalletRepository } from "../../domain/repositories/wallet.respository.interface";
import { WalletCreateDatabaseDto } from "../../application/dtos/wallet.create-database.dto";
import { WalletUpdateDatabaseDto } from "../../application/dtos/wallet.update-database.dto";

@Injectable()
export class WalletRepositoryService implements IWalletRepository {
    constructor(
        @InjectRepository(WalletORMEntity)
        private readonly walletRepostory: Repository<WalletORMEntity>
    ) {}

    async findAll(): Promise<Wallet[]> {
        const entities = await this.walletRepostory.find();
        return this.mapArrToDomain(entities);
    }

    async findById(id: number): Promise<Wallet> {
        const entity = await this.walletRepostory.findOne({
            where: { id }
        });
        return this.mapToDomain(entity);
    }

    async findByUuid(uuid: string): Promise<Wallet> {
        const entity = await this.walletRepostory.findOne({
            where: { uuid }
        });
        return this.mapToDomain(entity);
    }

    async findByUserId(user_id: number): Promise<Wallet[]> {
        const entities = await this.walletRepostory.find({
            where: { user_id }
        });
        return this.mapArrToDomain(entities);
    }

    async findByBankId(bank_id: number): Promise<Wallet[]> {
        const entities = await this.walletRepostory.find({
            where: { bank_id }
        });
        return this.mapArrToDomain(entities);
    }

    async findByBankIdAndUserId(
        bank_id: number,
        user_id: number
    ): Promise<Wallet> {
        const entity = await this.walletRepostory.findOne({
            where: { bank_id, user_id }
        });
        return this.mapToDomain(entity);
    }

    async create(data: WalletCreateDatabaseDto): Promise<Wallet> {
        const entity = this.walletRepostory.create(data);
        const newEntity = await this.walletRepostory.save(entity);
        return this.mapToDomain(newEntity);
    }

    async update(id: number, data: WalletUpdateDatabaseDto): Promise<Wallet> {
        await this.walletRepostory.update(id, data);
        return this.findById(id);
    }

    async delete(id: number): Promise<void> {
        await this.walletRepostory.delete(id);
        return;
    }

    private mapToDomain(entity: WalletORMEntity): Wallet {
        if (!entity) return null;
        const wallet = new Wallet();
        wallet.id = entity.id;
        wallet.uuid = entity.uuid;
        wallet.user_id = entity.user_id;
        wallet.bank_id = entity.bank_id;
        wallet.balance = entity.balance;
        wallet.status = entity.status;
        wallet.created_at = entity.created_at;
        wallet.updated_at = entity.updated_at;
        return wallet;
    }

    private mapArrToDomain(entities: WalletORMEntity[]): Wallet[] {
        if (
            Array.isArray(entities) &&
            (entities == null || entities.length == 0)
        )
            return null;
        return entities.map((entity) => {
            const wallet = new Wallet();
            wallet.id = entity.id;
            wallet.uuid = entity.uuid;
            wallet.user_id = entity.user_id;
            wallet.bank_id = entity.bank_id;
            wallet.balance = entity.balance;
            wallet.status = entity.status;
            wallet.created_at = entity.created_at;
            wallet.updated_at = entity.updated_at;

            return wallet;
        });
    }
}
