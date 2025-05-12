import { Inject, Injectable } from "@nestjs/common";
import { IUseCase } from "src/shared/domain/use-cases/use-case.interface";
import { IIdentificationTypeRepository } from "../../domain/repositories/identification_type.respository.interface";
import { IdentificationType } from "../../domain/entities/identification_type.entity";

/**
 * Caso de uso destinado a la obtención de un tipo de identificación por su nombre.
 *
 * Responsable de la obtención de un tipo de identificación usando el nombre proporcionado.
 * Implementa el contrato IUseCase.
 */
@Injectable()
export class findByNameIdentificationTypeUseCase
    implements IUseCase<string, IdentificationType>
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
     * Ejecuta la lógica de negocio: obtención de un tipo de identificación por su nombre.
     *
     * @param {string} name - Nombre único del tipo de identificación.
     * @returns {IdentificationType} - El tipo de identificación con el nombre proporcionado.
     */
    async execute(name: string): Promise<IdentificationType> {
        return this.identificationTypeRepository.findByName(name);
    }
}
