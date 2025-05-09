import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { UserORMEntity } from "../orm/user.orm-entity";
import { Repository } from "typeorm";
import { IUserRepository } from "../../domain/repositories/user.respository.interface";
import { User } from "../../domain/entities/user.entity";
import { UserCreateDatabaseDto } from "../../application/dtos/user.create-database.dto";
import { UserUpdateDatabaseDto } from "../../application/dtos/user.update-database.dto";

@Injectable()
export class UserRepositoryService implements IUserRepository {
    constructor(
        @InjectRepository(UserORMEntity)
        private readonly userRepository: Repository<UserORMEntity>
    ) {}

    async findAll(): Promise<User[]> {
        const entities = await this.userRepository.find();
        return this.mapArrToDomain(entities);
    }

    async findById(id: number): Promise<User> {
        const entity = await this.userRepository.findOne({ where: { id } });
        return this.mapToDomain(entity);
    }

    async findByUuid(uuid: string): Promise<User> {
        const entity = await this.userRepository.findOne({ where: { uuid } });
        return this.mapToDomain(entity);
    }

    async findPasswordByUuid(uuid: string): Promise<string> {
        const entity = await this.userRepository.findOne({
            where: { uuid },
            select: { password: true }
        });
        return entity.password;
    }

    async findByUsername(username: string): Promise<User> {
        const entity = await this.userRepository.findOne({
            where: { username, status: true }
        });
        return this.mapToDomain(entity);
    }

    async findByEmail(email: string): Promise<User> {
        const entity = await this.userRepository.findOne({
            where: { email, status: true }
        });
        return this.mapToDomain(entity);
    }

    async findByIdentificationNumberAndIdentificationTypeId(
        identification_number: string,
        identification_type_id: number
    ): Promise<User> {
        const entity = await this.userRepository.findOne({
            where: { identification_number, identification_type_id }
        });
        return this.mapToDomain(entity);
    }

    async create(data: UserCreateDatabaseDto): Promise<User> {
        const entity = this.userRepository.create(data);
        const newEntity = await this.userRepository.save(entity);
        return this.mapToDomain(newEntity);
    }

    async update(id: number, data: UserUpdateDatabaseDto): Promise<User> {
        await this.userRepository.update(id, data);
        return await this.findById(id);
    }

    async delete(id: number): Promise<void> {
        await this.userRepository.delete(id);
        return;
    }

    private mapToDomain(entity: UserORMEntity): User {
        if (!entity) return null;
        const user = new User();
        user.id = entity.id;
        user.username = entity.username;
        user.uuid = entity.uuid;
        user.first_name = entity.first_name;
        user.middle_name = entity.middle_name;
        user.last_name = entity.last_name;
        user.second_last_name = entity.second_last_name;
        user.identification_number = entity.identification_number;
        user.identification_type_id = entity.identification_type_id;
        user.email = entity.email;
        user.phone = entity.phone;
        user.address = entity.address;
        user.status = entity.status;
        user.created_at = entity.created_at;
        user.updated_at = entity.updated_at;
        return user;
    }

    private mapArrToDomain(entities: UserORMEntity[]): User[] {
        if (
            Array.isArray(entities) &&
            (entities == null || entities.length == 0)
        )
            return null;
        return entities.map((entity) => {
            const user = new User();
            user.id = entity.id;
            user.username = entity.username;
            user.uuid = entity.uuid;
            user.first_name = entity.first_name;
            user.middle_name = entity.middle_name;
            user.last_name = entity.last_name;
            user.second_last_name = entity.second_last_name;
            user.identification_number = entity.identification_number;
            user.identification_type_id = entity.identification_type_id;
            user.email = entity.email;
            user.phone = entity.phone;
            user.address = entity.address;
            user.status = entity.status;
            user.created_at = entity.created_at;
            user.updated_at = entity.updated_at;
            return user;
        });
    }
}
