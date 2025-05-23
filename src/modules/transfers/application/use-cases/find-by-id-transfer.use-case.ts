import { Inject, Injectable } from "@nestjs/common";
import { IUseCase } from "src/shared/domain/use-cases/use-case.interface";
import { Transfer } from "../../domain/entities/transfer.entity";
import { ITransferRepository } from "../../domain/repositories/transfer.respository.interface";

/**
 * Caso de uso para obtener una transferencia por su ID.
 *
 * Responsable de recuperar una transferencia específica usando su identificador único.
 * Implementa el contrato IUseCase.
 */
@Injectable()
export class findByIdTransferUseCase implements IUseCase<number, Transfer> {
    /**
     * Crea una instancia del caso de uso con el repositorio de transferencias inyectado.
     *
     * @param {ITransferRepository} transferRepository - Repositorio encargado de gestionar las transferencias.
     */
    constructor(
        @Inject("ITransferRepository")
        private transferRepository: ITransferRepository
    ) {}

    /**
     * Ejecuta la lógica de negocio para recuperar una transferencia por su ID.
     *
     * @param {number} id - El identificador único de la transferencia a buscar.
     * @returns {Promise<Transfer>} - La transferencia correspondiente al ID proporcionado.
     */
    async execute(id: number): Promise<Transfer> {
        return this.transferRepository.findById(id);
    }
}
