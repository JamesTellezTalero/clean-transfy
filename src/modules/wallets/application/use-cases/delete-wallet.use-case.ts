import { Inject, Injectable } from "@nestjs/common";
import { IUseCase } from "src/shared/domain/use-cases/use-case.interface";
import { NotFoundResponse } from "src/shared/application/dtos/api-responses/errors/not-found-error-response.dto";
import { IWalletRepository } from "../../domain/repositories/wallet.respository.interface";
import { IUserRepository } from "src/modules/users/domain/repositories/user.respository.interface";

/**
 * Caso de uso para eliminar una billetera de un usuario.
 *
 * Este caso de uso verifica si la billetera y el usuario existen, y si la billetera le pertenece al usuario.
 * Si todas las validaciones son exitosas, elimina la billetera de la base de datos.
 *
 * @class deleteWalletUseCase
 */
@Injectable()
export class deleteWalletUseCase
    implements IUseCase<{ wallet_uuid: string; user_uuid: string }, void>
{
    /**
     * Constructor del caso de uso.
     *
     * @param {IWalletRepository} walletRepository Repositorio que maneja las operaciones CRUD de billeteras.
     * @param {IUserRepository} userRepository Repositorio que maneja las operaciones CRUD de usuarios.
     */
    constructor(
        @Inject("IWalletRepository")
        private walletRepository: IWalletRepository,
        @Inject("IUserRepository")
        private userRepository: IUserRepository
    ) {}

    /**
     * Ejecuta la eliminación de una billetera asociada a un usuario.
     *
     * Este método recibe el UUID de la billetera y del usuario, valida su existencia
     * y que la billetera pertenezca al usuario. Si las validaciones se cumplen, elimina la billetera.
     *
     * @param {Object} body Objeto que contiene los identificadores de la billetera y el usuario.
     * @param {string} body.wallet_uuid UUID de la billetera a eliminar.
     * @param {string} body.user_uuid UUID del usuario propietario de la billetera.
     * @returns {Promise<void>} No retorna nada si la operación es exitosa.
     * @throws {NotFoundResponse} Si la billetera no existe, el usuario no existe, o la billetera no pertenece al usuario.
     */
    async execute(body: {
        wallet_uuid: string;
        user_uuid: string;
    }): Promise<void> {
        const preExistWallet = await this.walletRepository.findByUuid(
            body?.wallet_uuid
        );
        if (!preExistWallet)
            throw new NotFoundResponse("Sent Wallet doesn't exist");

        const preExistuser = await this.userRepository.findByUuid(
            body.user_uuid
        );
        if (!preExistuser)
            throw new NotFoundResponse("Sent User doesn't exist");
        else if (preExistuser.id !== preExistWallet.user_id)
            throw new NotFoundResponse("Sent Wallet doesn't belong to User");
        else return this.walletRepository.delete(preExistWallet.id);
    }
}
