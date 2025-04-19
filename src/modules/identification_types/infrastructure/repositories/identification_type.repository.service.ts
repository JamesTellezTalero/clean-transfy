import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { IdentificationTypeORMEntity } from "../orm/identification_type.orm-entity";
import { Repository } from "typeorm";
import { IdentificationType } from "../../domain/entities/identification_type.entity";
import { IdentificationTypeCreateDatabaseDto } from "../../application/dtos/identification_type.create-database.dto";
import { IIdentificationTypeRepository } from "../../domain/repositories/identification_type.respository.interface";

@Injectable()
export class IdentificationTypeRepositoryService
    implements IIdentificationTypeRepository
{
    constructor(
        @InjectRepository(IdentificationTypeORMEntity)
        private readonly identificationTypeRepository: Repository<IdentificationTypeORMEntity>
    ) {}

    async findById(id: number): Promise<IdentificationType> {
        const entity = await this.identificationTypeRepository.findOne({
            where: { id }
        });
        return this.mapToDomain(entity);
    }

    async findAll(): Promise<IdentificationType[]> {
        const entities = await this.identificationTypeRepository.find();
        return this.mapArrToDomain(entities);
    }

    async findByName(name: string): Promise<IdentificationType> {
        const entity = await this.identificationTypeRepository.findOne({
            where: { name }
        });
        return this.mapToDomain(entity);
    }

    async findByCode(code: string): Promise<IdentificationType> {
        const entity = await this.identificationTypeRepository.findOne({
            where: { code }
        });
        return this.mapToDomain(entity);
    }

    async create(
        data: IdentificationTypeCreateDatabaseDto
    ): Promise<IdentificationType> {
        const entity = this.identificationTypeRepository.create(data);
        const newEntity = await this.identificationTypeRepository.save(entity);
        return this.mapToDomain(newEntity);
    }

    async update(
        id: number,
        data: IdentificationTypeCreateDatabaseDto
    ): Promise<IdentificationType> {
        await this.identificationTypeRepository.update(id, data);
        return await this.findById(id);
    }

    async delete(id: number): Promise<void> {
        await this.identificationTypeRepository.delete(id);
        return;
    }

    private mapToDomain(
        entity: IdentificationTypeORMEntity
    ): IdentificationType {
        if (!entity) return null;
        const identificationType = new IdentificationType();
        identificationType.id = entity.id;
        identificationType.name = entity.name;
        identificationType.created_at = entity.created_at;
        identificationType.updated_at = entity.updated_at;
        return identificationType;
    }

    private mapArrToDomain(
        entities: IdentificationTypeORMEntity[]
    ): IdentificationType[] {
        if (
            Array.isArray(entities) &&
            (entities == null || entities.length == 0)
        )
            return null;
        return entities.map((entity) => {
            const identificationType = new IdentificationType();
            identificationType.id = entity.id;
            identificationType.name = entity.name;
            identificationType.created_at = entity.created_at;
            identificationType.updated_at = entity.updated_at;

            return identificationType;
        });
    }
}
