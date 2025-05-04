import { Injectable } from "@nestjs/common";
import { IBankRepository } from "../../domain/repositories/bank.respository.interface";
import { Bank } from "../../domain/entities/bank.entity";
import { BankORMEntity } from "../orm/bank.orm-entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { BankCreateDatabaseDto } from "../../application/dtos/bank.create-database.dto";

/**
 * Servicio de infraestructura que implementa el contrato `IBankRepository`
 * utilizando TypeORM como tecnología de persistencia.
 */
@Injectable()
export class BankRepositoryService implements IBankRepository {
    constructor(
        @InjectRepository(BankORMEntity)
        private readonly bankRepository: Repository<BankORMEntity>
    ) {}

    /**
     * Retorna un banco por su ID.
     * @param {number} id - Identificador del banco.
     * @returns {Bank} entidad de dominio.
     */
    async findById(id: number): Promise<Bank> {
        const entity = await this.bankRepository.findOne({ where: { id } });
        return this.mapToDomain(entity);
    }

    /**
     * Retorna todos los bancos registrados.
     * @returns {Array<Bank>} arreglo de entidades de dominio.
     */
    async findAll(): Promise<Bank[]> {
        const entities = await this.bankRepository.find();
        return this.mapArrToDomain(entities);
    }

    /**
     * Retorna un banco por su ID.
     * @param {string} name - nombre del banco.
     * @returns {Bank} entidad de dominio.
     */
    async findByName(name: string): Promise<Bank> {
        const entity = await this.bankRepository.findOne({ where: { name } });
        return this.mapToDomain(entity);
    }

    /**
     * Retorna un banco por su ID.
     * @param {string} code - codigo unico del banco.
     * @returns {Bank} entidad de dominio.
     */
    async findByCode(code: string): Promise<Bank> {
        const entity = await this.bankRepository.findOne({ where: { code } });
        return this.mapToDomain(entity);
    }

    /**
     * Creacion de Bancos.
     * @param {BankCreateDatabaseDto} data - contenido del banco.
     * @returns {Bank} Modelo primitivo de entidad Bank
     */
    async create(data: BankCreateDatabaseDto): Promise<Bank> {
        const entity = this.bankRepository.create(data);
        const newEntity = await this.bankRepository.save(entity);
        return this.mapToDomain(newEntity);
    }

    /**
     * Actualizacion de Bancos.
     *
     * @param {{
     *      id: number,
     *      dto: BankUpdateDatabaseDto
     * }}
     * id - Id necesario para la actualizacion de bancos.
     * dto - body necesario para la actualizacion de bancos.
     *
     * @returns {Bank} Modelo primitivo de entidad Bank
     */
    async update(id: number, data: BankCreateDatabaseDto): Promise<Bank> {
        await this.bankRepository.update(id, data);
        return await this.findById(id);
    }

    /**
     * Eliminacion de Bancos.
     * @param {number} id - identificador unico del banco.
     * @returns {void}
     */
    async delete(id: number): Promise<void> {
        await this.bankRepository.delete(id);
        return;
    }

    /**
     * Mapea la entidad de ORM y retorna su espejo primitivo.
     * @param {BankORMEntity} entity - Entidad de ORM para Bancos.
     * @returns {Bank} Modelo primitivo de entidad Bank
     */
    private mapToDomain(entity: BankORMEntity): Bank {
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

    /**
     * Mapea la entidad de ORM y retorna su espejo primitivo.
     * @param {Array<BankORMEntity>} entities - Entidades de ORM para Bancos.
     * @returns {Bank} Modelo primitivo de entidad Bank
     */
    private mapArrToDomain(entities: BankORMEntity[]): Bank[] {
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
