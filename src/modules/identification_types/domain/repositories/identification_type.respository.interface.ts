import { IdentificationTypeCreateDatabaseDto } from "../../application/dtos/identification_type.create-database.dto";
import { IdentificationTypeUpdateDatabaseDto } from "../../application/dtos/identification_type.update-database.dto";
import { IdentificationType } from "../entities/identification_type.entity";

export interface IIdentificationTypeRepository {
    findById(id: number): Promise<IdentificationType>;
    findByName(name: string): Promise<IdentificationType>;
    findByCode(code: string): Promise<IdentificationType>;
    findAll(): Promise<IdentificationType[]>;
    create(
        data: IdentificationTypeCreateDatabaseDto
    ): Promise<IdentificationType>;
    update(
        id: number,
        data: IdentificationTypeUpdateDatabaseDto
    ): Promise<IdentificationType>;
    delete(id: number): Promise<void>;
}
