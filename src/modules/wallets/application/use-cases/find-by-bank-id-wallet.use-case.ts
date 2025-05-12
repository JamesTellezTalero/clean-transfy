import { Inject, Injectable } from "@nestjs/common";
import { IUseCase } from "src/shared/domain/use-cases/use-case.interface";
import { Wallet } from "../../domain/entities/wallet.entity";
import { IWalletRepository } from "../../domain/repositories/wallet.respository.interface";

/**
 * Caso de uso para obtener billeteras por ID de banco.
 *
 * Este caso de uso se encarga de consultar todas las billeteras que están asociadas a un banco específico
 * mediante su identificador único (`bank_id`).
 *
 * @class findByBankIdWalletUseCase
 */
@Injectable()
export class findByBankIdWalletUseCase implements IUseCase<number, Wallet[]> {
    /**
     * Constructor del caso de uso.
     *
     * @param {IWalletRepository} walletRepository Repositorio que maneja las operaciones CRUD de billeteras.
     */
    constructor(
        @Inject("IWalletRepository")
        private walletRepository: IWalletRepository
    ) {}

    /**
     * Ejecuta la búsqueda de billeteras asociadas a un banco.
     *
     * Este método recibe el `id` del banco y retorna todas las billeteras vinculadas a dicho banco.
     *
     * @param {number} id Identificador único del banco.
     * @returns {Promise<Wallet[]>} Arreglo con las billeteras encontradas.
     */
    async execute(id: number): Promise<Wallet[]> {
        return this.walletRepository.findByBankId(id);
    }
}
