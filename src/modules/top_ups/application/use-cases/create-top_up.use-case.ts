import { Inject, Injectable } from "@nestjs/common";
import { IUseCase } from "src/shared/domain/use-cases/use-case.interface";
import { ConflictResponse } from "src/shared/application/dtos/api-responses/errors/conflict-error-response.dto";
import { TopUpCreateDatabaseDto } from "../dtos/top_up.create-database.dto";
import { TopUp } from "../../domain/entities/top_up.entity";
import { ITopUpRepository } from "../../domain/repositories/top_up.respository.interface";
import { IWalletRepository } from "src/modules/wallets/domain/repositories/wallet.respository.interface";
import { NotFoundResponse } from "src/shared/application/dtos/api-responses/errors/not-found-error-response.dto";
import { IUserRepository } from "src/modules/users/domain/repositories/user.respository.interface";

/**
 * Caso de uso destinado a la creación de una recarga (top-up) en un monedero.
 *
 * Responsable de validar la existencia y estado del monedero y el usuario, asociar la recarga al monedero
 * correspondiente y actualizar el saldo del monedero con la cantidad recargada.
 * Implementa el contrato IUseCase.
 */
@Injectable()
export class createTopUpUseCase
    implements IUseCase<TopUpCreateDatabaseDto, TopUp>
{
    /**
     * Crea una instancia del caso de uso con los repositorios de recarga, monedero y usuario inyectados.
     *
     * @param {ITopUpRepository} topUpRepository - Repositorio encargado de la gestión de las recargas (top-ups).
     * @param {IWalletRepository} walletRepository - Repositorio encargado de la gestión de los monederos.
     * @param {IUserRepository} userRepository - Repositorio encargado de la gestión de usuarios.
     */
    constructor(
        @Inject("ITopUpRepository")
        private topUpRepository: ITopUpRepository,
        @Inject("IWalletRepository")
        private walletRepository: IWalletRepository,
        @Inject("IUserRepository")
        private userRepository: IUserRepository
    ) {}

    /**
     * Ejecuta la lógica de negocio para la creación de una recarga (top-up) en un monedero.
     *
     * @param {TopUpCreateDatabaseDto} createDto - Datos necesarios para crear la recarga.
     * @returns {TopUp} - La recarga recién creada con los datos proporcionados.
     * @throws {NotFoundResponse} - Si no se encuentra el monedero o si el usuario no existe o no corresponde al monedero.
     */
    async execute(createDto: TopUpCreateDatabaseDto): Promise<TopUp> {
        // Verificar si el monedero existe y está activo
        const wallet = await this.walletRepository.findByUuid(
            createDto.wallet_uuid
        );

        if (!wallet || !wallet.status)
            throw new NotFoundResponse("Wallet not found or inactive");

        // Verificar si el usuario existe
        const preExistuser = await this.userRepository.findByUuid(
            createDto.user_uuid
        );
        if (!preExistuser)
            throw new NotFoundResponse("Sent User doesn't exist");

        // Verificar si el monedero corresponde al usuario
        if (preExistuser.id !== wallet.user_id)
            throw new NotFoundResponse("Sent Wallet doesn't belong to User");

        // Asociar el monedero a la recarga
        createDto.wallet_id = wallet.id;

        // Crear la recarga
        const newTopUp = await this.topUpRepository.create(createDto);

        // Actualizar el saldo del monedero
        wallet.balance = Number(wallet.balance) + Number(createDto.amount);
        wallet.updated_at = new Date();
        await this.walletRepository.update(wallet.id, wallet);

        // Retornar la recarga creada
        return newTopUp;
    }
}
