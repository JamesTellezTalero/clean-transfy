import { Inject, Injectable } from "@nestjs/common";
import { IUseCase } from "src/shared/domain/use-cases/use-case.interface";

import { NotFoundResponse } from "src/shared/application/dtos/api-responses/errors/not-found-error-response.dto";
import { IWalletRepository } from "../../domain/repositories/wallet.respository.interface";
import { Wallet } from "../../domain/entities/wallet.entity";
import { WalletUpdateDatabaseDto } from "../dtos/wallet.update-database.dto";

/**
 * Caso de uso para actualizar una billetera en la base de datos.
 *
 * Este caso de uso verifica la existencia de la billetera antes de aplicar los cambios.
 *
 * @class updateWalletUseCase
 */
@Injectable()
export class updateWalletUseCase
    implements IUseCase<{ id: number; dto: WalletUpdateDatabaseDto }, Wallet>
{
    /**
     * Constructor del caso de uso.
     *
     * @param {IWalletRepository} walletRepository Repositorio encargado de las operaciones con billeteras.
     */
    constructor(
        @Inject("IWalletRepository")
        private walletRepository: IWalletRepository
    ) {}

    /**
     * Ejecuta la actualización de una billetera.
     *
     * Verifica que la billetera exista antes de proceder con la actualización.
     *
     * @param {{ id: number; dto: WalletUpdateDatabaseDto }} updateBody Objeto con el ID y los datos a actualizar.
     * @returns {Promise<Wallet>} La entidad actualizada.
     */
    async execute(updateBody: {
        id: number;
        dto: WalletUpdateDatabaseDto;
    }): Promise<Wallet> {
        const preExistWallet = await this.walletRepository.findById(
            updateBody.id
        );
        if (!preExistWallet)
            throw new NotFoundResponse("Sent Wallet doesn't exist");
        else return this.walletRepository.update(updateBody.id, updateBody.dto);
    }
}
