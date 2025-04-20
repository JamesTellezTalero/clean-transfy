import { UserCreateDatabaseDto } from "../../application/dtos/user.create-database.dto";
import { UserUpdateDatabaseDto } from "../../application/dtos/user.update-database.dto";
import { User } from "../entities/user.entity";

export interface IUserRepository {
    findById(id: number): Promise<User>;
    findByUuid(uuid: string): Promise<User>;
    findByUsername(username: string): Promise<User>;
    findByEmail(email: string): Promise<User>;
    findByIdentificationAndIdentificationType(
        identification: string,
        identificationTypeId: number
    ): Promise<User>;
    findAll(): Promise<User[]>;
    create(data: UserCreateDatabaseDto): Promise<User>;
    update(id: number, data: UserUpdateDatabaseDto): Promise<User>;
    delete(id: number): Promise<void>;
}
