import { Inject, Injectable } from "@nestjs/common";
import { IUseCase } from "src/shared/domain/use-cases/use-case.interface";
import { IIdentificationTypeRepository } from "../../domain/repositories/identification_type.respository.interface";
import { IdentificationType } from "../../domain/entities/identification_type.entity";

/**
 * Caso de uso destinado a la obtención de todos los tipos de identificación.
 *
 * Responsable de la obtención de todos los tipos de identificación disponibles
 * en la base de datos.
 * Implementa el contrato IUseCase.
 */
@Injectable()
export class findAllIdentificationTypeUseCase
    implements IUseCase<null, IdentificationType[]>
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
     * Ejecuta la lógica de negocio: obtención de todos los tipos de identificación.
     *
     * @returns {IdentificationType[]} Lista de tipos de identificación.
     */
    async execute(): Promise<IdentificationType[]> {
        return this.identificationTypeRepository.findAll();
    }
}
