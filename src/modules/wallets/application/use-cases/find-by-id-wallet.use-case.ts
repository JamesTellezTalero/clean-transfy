import { Inject, Injectable } from "@nestjs/common";
import { IUseCase } from "src/shared/domain/use-cases/use-case.interface";
import { Wallet } from "../../domain/entities/wallet.entity";
import { IWalletRepository } from "../../domain/repositories/wallet.respository.interface";

/**
 * Caso de uso para obtener una billetera por su ID.
 *
 * Este caso de uso se encarga de buscar una billetera específica en la base de datos
 * utilizando su identificador único (`id`).
 *
 * @class findByIdWalletUseCase
 */
@Injectable()
export class findByIdWalletUseCase implements IUseCase<number, Wallet> {
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
     * Ejecuta la búsqueda de una billetera por ID.
     *
     * Este método recibe el `id` de la billetera y retorna la entidad correspondiente si existe.
     *
     * @param {number} id Identificador único de la billetera.
     * @returns {Promise<Wallet>} Entidad `Wallet` correspondiente al ID proporcionado.
     */
    async execute(id: number): Promise<Wallet> {
        return this.walletRepository.findById(id);
    }
}
