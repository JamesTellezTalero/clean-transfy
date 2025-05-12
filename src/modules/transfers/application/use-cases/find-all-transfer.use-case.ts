import { Inject, Injectable } from "@nestjs/common";
import { IUseCase } from "src/shared/domain/use-cases/use-case.interface";
import { Transfer } from "../../domain/entities/transfer.entity";
import { ITransferRepository } from "../../domain/repositories/transfer.respository.interface";

/**
 * Caso de uso para obtener todas las transferencias.
 *
 * Responsable de recuperar todas las transferencias registradas en el repositorio.
 * Implementa el contrato IUseCase.
 */
@Injectable()
export class findAllTransferUseCase implements IUseCase<null, Transfer[]> {
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
     * Ejecuta la lógica de negocio para recuperar todas las transferencias registradas.
     *
     * @returns {Promise<Transfer[]>} - Un array con todas las transferencias registradas.
     */
    async execute(): Promise<Transfer[]> {
        return this.transferRepository.findAll();
    }
}
