import { Inject, Injectable } from "@nestjs/common";
import { IUseCase } from "src/shared/domain/use-cases/use-case.interface";
import { ConflictResponse } from "src/shared/application/dtos/api-responses/errors/conflict-error-response.dto";
import { IIdentificationTypeRepository } from "../../domain/repositories/identification_type.respository.interface";
import { IdentificationType } from "../../domain/entities/identification_type.entity";
import { IdentificationTypeCreateDatabaseDto } from "../dtos/identification_type.create-database.dto";

/**
 * Caso de uso para la creación de un nuevo tipo de identificación.
 *
 * Valida la unicidad del nombre y código antes de persistir.
 */
@Injectable()
export class CreateIdentificationTypeUseCase
    implements IUseCase<IdentificationTypeCreateDatabaseDto, IdentificationType>
{
    /**
     * Inicializa el caso de uso con el repositorio de tipos de identificación.
     *
     * @param identificationTypeRepository Repositorio encargado del acceso a datos de tipos de identificación.
     */
    constructor(
        @Inject("IIdentificationTypeRepository")
        private readonly identificationTypeRepository: IIdentificationTypeRepository
    ) {}

    /**
     * Ejecuta la lógica de negocio para crear un tipo de identificación, validando la unicidad.
     *
     * @param createDto Datos requeridos para la creación del tipo de identificación.
     * @returns La entidad `IdentificationType` creada.
     * @throws {ConflictResponse} Si el nombre o el código ya existen.
     */
    async execute(
        createDto: IdentificationTypeCreateDatabaseDto
    ): Promise<IdentificationType> {
        const existingByName =
            await this.identificationTypeRepository.findByName(createDto.name);
        if (existingByName)
            throw new ConflictResponse(
                "Identification Type name already exists."
            );

        const existingByCode =
            await this.identificationTypeRepository.findByCode(createDto.code);
        if (existingByCode)
            throw new ConflictResponse(
                "Identification Type code already exists."
            );

        return this.identificationTypeRepository.create(createDto);
    }
}
