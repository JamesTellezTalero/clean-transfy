import { Inject, Injectable } from "@nestjs/common";
import { IUseCase } from "src/shared/domain/use-cases/use-case.interface";
import { Transfer } from "../../domain/entities/transfer.entity";
import { ITransferRepository } from "../../domain/repositories/transfer.respository.interface";

/**
 * Caso de uso para obtener todas las transferencias realizadas desde una wallet específica.
 *
 * Este caso de uso se encarga de recuperar todas las transferencias en las que la wallet
 * de origen coincide con el ID proporcionado.
 * Implementa el contrato IUseCase.
 */
@Injectable()
export class findBySourceWalletIdTransferUseCase
    implements IUseCase<number, Transfer[]>
{
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
     * Ejecuta la lógica de negocio para recuperar todas las transferencias de una wallet de origen.
     *
     * @param {number} source_wallet_id - El identificador único de la wallet de origen de las transferencias.
     * @returns {Promise<Transfer[]>} - Un arreglo de transferencias correspondientes a la wallet de origen.
     */
    async execute(source_wallet_id: number): Promise<Transfer[]> {
        return this.transferRepository.findBySourceWalletId(source_wallet_id);
    }
}
