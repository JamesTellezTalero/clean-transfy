import { Inject, Injectable } from "@nestjs/common";
import { IUseCase } from "src/shared/domain/use-cases/use-case.interface";
import { IdentificationType } from "../../domain/entities/identification_type.entity";
import { IIdentificationTypeRepository } from "../../domain/repositories/identification_type.respository.interface";

/**
 * Caso de uso destinado a la obtención de un tipo de identificación por su id.
 *
 * Responsable de la obtención de un tipo de identificación específico usando el id proporcionado.
 * Implementa el contrato IUseCase.
 */
@Injectable()
export class findByIdIdentificationTypeUseCase
    implements IUseCase<number, IdentificationType>
{
    /**
     * Crea una instancia del caso de uso con el repositorio de tipos de identificación inyectado.
     *
     * @param {IIdentificationTypeRepository} identificationTypeRepository - Repositorio encargado de manejar
     * los procesos de lectura para la entidad `IdentificationType`.
     */
    constructor(
        @Inject("IIdentificationTypeRepository")
        private identificationTypeRepository: IIdentificationTypeRepository
    ) {}

    /**
     * Ejecuta la lógica de negocio: obtención de un tipo de identificación por su id.
     *
     * @param {number} id - Identificador único del tipo de identificación.
     * @returns {IdentificationType} - El tipo de identificación con el id proporcionado.
     */
    async execute(id: number): Promise<IdentificationType> {
        return this.identificationTypeRepository.findById(id);
    }
}
