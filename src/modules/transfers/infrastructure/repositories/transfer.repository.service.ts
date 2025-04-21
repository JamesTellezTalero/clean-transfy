import { Injectable } from "@nestjs/common";
import { ITransferRepository } from "../../domain/repositories/transfer.respository.interface";
import { InjectRepository } from "@nestjs/typeorm";
import { TransferORMEntity } from "../orm/transfer.orm-entity";
import { Repository } from "typeorm";
import { Transfer } from "../../domain/entities/transfer.entity";
import { TransferCreateDatabaseDto } from "../../application/dtos/transfer.create-database.dto";

@Injectable()
export class TransferRepositoryService implements ITransferRepository {
    constructor(
        @InjectRepository(TransferORMEntity)
        private readonly transferRepository: Repository<TransferORMEntity>
    ) {}

    async findAll(): Promise<Transfer[]> {
        const entities = await this.transferRepository.find();
        return this.mapArrToDomain(entities);
    }

    async findById(id: number): Promise<Transfer> {
        const entity = await this.transferRepository.findOne({
            where: { id }
        });
        return this.mapToDomain(entity);
    }

    async findBySourceWalletId(source_wallet_id: number): Promise<Transfer[]> {
        const entities = await this.transferRepository.find({
            where: { source_wallet_id }
        });
        return this.mapArrToDomain(entities);
    }

    async findByTargetWalletId(target_wallet_id: number): Promise<Transfer[]> {
        const entities = await this.transferRepository.find({
            where: { target_wallet_id }
        });
        return this.mapArrToDomain(entities);
    }

    async create(data: TransferCreateDatabaseDto): Promise<Transfer> {
        const entity = this.transferRepository.create(data);
        const newEntity = await this.transferRepository.save(entity);
        return this.mapToDomain(newEntity);
    }

    private mapToDomain(entity: TransferORMEntity): Transfer {
        if (!entity) return null;
        const transfer = new Transfer();
        transfer.id = entity.id;
        transfer.source_wallet_id = entity.source_wallet_id;
        transfer.target_wallet_id = entity.target_wallet_id;
        transfer.amount = entity.amount;
        transfer.created_at = entity.created_at;
        transfer.updated_at = entity.updated_at;
        return transfer;
    }

    private mapArrToDomain(entities: TransferORMEntity[]): Transfer[] {
        if (
            Array.isArray(entities) &&
            (entities == null || entities.length == 0)
        )
            return null;
        return entities.map((entity) => {
            const transfer = new Transfer();
            transfer.id = entity.id;
            transfer.source_wallet_id = entity.source_wallet_id;
            transfer.target_wallet_id = entity.target_wallet_id;
            transfer.amount = entity.amount;
            transfer.created_at = entity.created_at;
            transfer.updated_at = entity.updated_at;

            return transfer;
        });
    }
}
