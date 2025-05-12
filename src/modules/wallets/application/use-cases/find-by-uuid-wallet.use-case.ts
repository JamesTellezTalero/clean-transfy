import { Inject, Injectable } from "@nestjs/common";
import { IUseCase } from "src/shared/domain/use-cases/use-case.interface";
import { Wallet } from "../../domain/entities/wallet.entity";
import { IWalletRepository } from "../../domain/repositories/wallet.respository.interface";

/**
 * Caso de uso para obtener una billetera por su UUID.
 *
 * Este caso de uso se encarga de buscar en la base de datos una billetera
 * utilizando el `uuid` proporcionado.
 *
 * @class findByUuidWalletUseCase
 */
@Injectable()
export class findByUuidWalletUseCase implements IUseCase<string, Wallet> {
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
     * Ejecuta la búsqueda de una billetera por UUID.
     *
     * Este método recibe el `uuid` de una billetera y retorna la entidad correspondiente.
     *
     * @param {string} uuid Identificador único de la billetera.
     * @returns {Promise<Wallet>} Entidad `Wallet` encontrada.
     */
    async execute(uuid: string): Promise<Wallet> {
        return this.walletRepository.findByUuid(uuid);
    }
}
