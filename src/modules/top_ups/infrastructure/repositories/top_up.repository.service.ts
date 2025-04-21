import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { TopUpORMEntity } from "../orm/top_up.orm-entity";
import { Repository } from "typeorm";
import { ITopUpRepository } from "../../domain/repositories/top_up.respository.interface";
import { TopUp } from "../../domain/entities/top_up.entity";
import { TopUpCreateDatabaseDto } from "../../application/dtos/top_up.create-database.dto";

@Injectable()
export class TopUpRepositoryService implements ITopUpRepository {
    constructor(
        @InjectRepository(TopUpORMEntity)
        private readonly topUpRepository: Repository<TopUpORMEntity>
    ) {}

    async findById(id: number): Promise<TopUp> {
        const entity = await this.topUpRepository.findOne({
            where: { id }
        });
        return this.mapToDomain(entity);
    }

    async findByWalletId(id: number): Promise<TopUp[]> {
        const entities = await this.topUpRepository.find({
            where: { wallet_id: id }
        });
        return this.mapArrToDomain(entities);
    }

    async findAll(): Promise<TopUp[]> {
        const entities = await this.topUpRepository.find();
        return this.mapArrToDomain(entities);
    }

    async create(data: TopUpCreateDatabaseDto): Promise<TopUp> {
        const entity = this.topUpRepository.create(data);
        const newEntity = await this.topUpRepository.save(entity);
        return this.mapToDomain(newEntity);
    }

    private mapToDomain(entity: TopUpORMEntity): TopUp {
        if (!entity) return null;
        const topUp = new TopUp();
        topUp.id = entity.id;
        topUp.wallet_id = entity.wallet_id;
        topUp.amount = entity.amount;
        topUp.created_at = entity.created_at;
        topUp.updated_at = entity.updated_at;
        return topUp;
    }

    private mapArrToDomain(entities: TopUpORMEntity[]): TopUp[] {
        if (
            Array.isArray(entities) &&
            (entities == null || entities.length == 0)
        )
            return null;
        return entities.map((entity) => {
            const topUp = new TopUp();
            topUp.id = entity.id;
            topUp.wallet_id = entity.wallet_id;
            topUp.amount = entity.amount;
            topUp.created_at = entity.created_at;
            topUp.updated_at = entity.updated_at;

            return topUp;
        });
    }
}
