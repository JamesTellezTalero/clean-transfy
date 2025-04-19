import { Injectable } from "@nestjs/common";
import { IBankRepository } from "../../domain/repositories/bank.respository.interface";
import { Bank } from "../../domain/entities/bank.entity";
import { BankMigrationEntity } from "../orm/bank.orm-entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { BankCreateDatabaseDto } from "../../application/dtos/bank.create-database.dto";

@Injectable()
export class BankRepositoryService implements IBankRepository {
    constructor(
        @InjectRepository(BankMigrationEntity)
        private readonly bankRepository: Repository<BankMigrationEntity>
    ) {}

    async findById(id: number): Promise<Bank> {
        const entity = await this.bankRepository.findOne({ where: { id } });
        return this.mapToDomain(entity);
    }

    async findAll(): Promise<Bank[]> {
        const entities = await this.bankRepository.find();
        return this.mapArrToDomain(entities);
    }

    async findByName(name: string): Promise<Bank> {
        const entity = await this.bankRepository.findOne({ where: { name } });
        return this.mapToDomain(entity);
    }

    async findByCode(code: string): Promise<Bank> {
        const entity = await this.bankRepository.findOne({ where: { code } });
        return this.mapToDomain(entity);
    }

    async create(data: BankCreateDatabaseDto): Promise<Bank> {
        const entity = this.bankRepository.create(data);
        const newEntity = await this.bankRepository.save(entity);
        return this.mapToDomain(newEntity);
    }

    async update(id: number, data: BankCreateDatabaseDto): Promise<Bank> {
        await this.bankRepository.update(id, data);
        return await this.findById(id);
    }

    async delete(id: number): Promise<void> {
        await this.bankRepository.delete(id);
        return;
    }

    private mapToDomain(entity: BankMigrationEntity): Bank {
        if (!entity) return null;
        const bank = new Bank();
        bank.id = entity.id;
        bank.name = entity.name;
        bank.code = entity.code;
        bank.status = entity.status;
        bank.created_at = entity.created_at;
        bank.updated_at = entity.updated_at;
        return bank;
    }

    private mapArrToDomain(entities: BankMigrationEntity[]): Bank[] {
        if (
            Array.isArray(entities) &&
            (entities == null || entities.length == 0)
        )
            return null;
        return entities.map((entity) => {
            const bank = new Bank();
            bank.id = entity.id;
            bank.name = entity.name;
            bank.code = entity.code;
            bank.status = entity.status;
            bank.created_at = entity.created_at;
            bank.updated_at = entity.updated_at;

            return bank;
        });
    }
}
