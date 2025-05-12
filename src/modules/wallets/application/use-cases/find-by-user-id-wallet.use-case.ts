import { Inject, Injectable } from "@nestjs/common";
import { IUseCase } from "src/shared/domain/use-cases/use-case.interface";
import { Wallet } from "../../domain/entities/wallet.entity";
import { IWalletRepository } from "../../domain/repositories/wallet.respository.interface";

/**
 * Caso de uso para obtener las billeteras asociadas a un usuario.
 *
 * Este caso de uso se encarga de buscar todas las billeteras en la base de datos
 * que estén asociadas al usuario con el `id` proporcionado.
 *
 * @class findByUserIdWalletUseCase
 */
@Injectable()
export class findByUserIdWalletUseCase implements IUseCase<number, Wallet[]> {
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
     * Ejecuta la búsqueda de billeteras por ID de usuario.
     *
     * Este método recibe el `id` del usuario y retorna un arreglo de billeteras asociadas a dicho usuario.
     *
     * @param {number} id Identificador único del usuario.
     * @returns {Promise<Wallet[]>} Arreglo de entidades `Wallet` asociadas al usuario.
     */
    async execute(id: number): Promise<Wallet[]> {
        return this.walletRepository.findByUserId(id);
    }
}
