import { Inject, Injectable } from "@nestjs/common";
import { IUseCase } from "src/shared/domain/use-cases/use-case.interface";
import { NotFoundResponse } from "src/shared/application/dtos/api-responses/errors/not-found-error-response.dto";
import { IIdentificationTypeRepository } from "../../domain/repositories/identification_type.respository.interface";

/**
 * Caso de uso destinado a la eliminación de un tipo de identificación.
 *
 * Responsable de la validación de la existencia de un tipo de identificación por su ID
 * y su posterior eliminación.
 * Implementa el contrato IUseCase.
 */
@Injectable()
export class deleteIdentificationTypeUseCase implements IUseCase<number, void> {
    /**
     * Crea una instancia del caso de uso con el repositorio de tipos de identificación inyectado.
     *
     * @param {IIdentificationTypeRepository} identificationTypeRepository - Repositorio encargado de manejar
     * los procesos de lectura y escritura para la entidad `IdentificationType`.
     */
    constructor(
        @Inject("IIdentificationTypeRepository")
        private identificationTypeRepository: IIdentificationTypeRepository
    ) {}

    /**
     * Ejecuta la lógica de negocio: validación de existencia de un tipo de identificación por ID y eliminación del mismo.
     *
     * @param {number} id - El ID del tipo de identificación a eliminar.
     * @throws {NotFoundResponse} Si el tipo de identificación no existe.
     * @returns {void} No devuelve ningún valor.
     */
    async execute(id: number): Promise<void> {
        const preExistIdentificationType =
            await this.identificationTypeRepository.findById(id);
        if (!preExistIdentificationType)
            throw new NotFoundResponse(
                "Sent Identification Type doesn't exist"
            );
        else return this.identificationTypeRepository.delete(id);
    }
}
