import { Inject, Injectable } from "@nestjs/common";
import { IUseCase } from "src/shared/domain/use-cases/use-case.interface";
import { Wallet } from "../../domain/entities/wallet.entity";
import { IWalletRepository } from "../../domain/repositories/wallet.respository.interface";

/**
 * Caso de uso para obtener todas las billeteras registradas.
 *
 * Este caso de uso se encarga de consultar y retornar todas las billeteras almacenadas en la base de datos.
 *
 * @class findAllWalletUseCase
 */
@Injectable()
export class findAllWalletUseCase implements IUseCase<null, Wallet[]> {
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
     * Ejecuta la consulta de todas las billeteras.
     *
     * Este método no recibe parámetros y retorna todas las billeteras existentes en la base de datos.
     *
     * @returns {Promise<Wallet[]>} Arreglo con todas las billeteras encontradas.
     */
    async execute(): Promise<Wallet[]> {
        return this.walletRepository.findAll();
    }
}
