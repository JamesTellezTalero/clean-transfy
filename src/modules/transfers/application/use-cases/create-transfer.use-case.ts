import { Inject, Injectable } from "@nestjs/common";
import { IUseCase } from "src/shared/domain/use-cases/use-case.interface";
import { NotFoundResponse } from "src/shared/application/dtos/api-responses/errors/not-found-error-response.dto";
import { TransferCreateDatabaseDto } from "../dtos/transfer.create-database.dto";
import { Transfer } from "../../domain/entities/transfer.entity";
import { ITransferRepository } from "../../domain/repositories/transfer.respository.interface";
import { IWalletRepository } from "src/modules/wallets/domain/repositories/wallet.respository.interface";
import { ConflictResponse } from "src/shared/application/dtos/api-responses/errors/conflict-error-response.dto";
import { IUserRepository } from "src/modules/users/domain/repositories/user.respository.interface";

/**
 * Caso de uso para realizar una transferencia entre dos billeteras.
 *
 * Responsable de validar y ejecutar la transferencia de una cantidad entre la billetera de origen y la de destino.
 * Implementa el contrato IUseCase.
 */
@Injectable()
export class createTransferUseCase
    implements IUseCase<TransferCreateDatabaseDto, Transfer>
{
    /**
     * Crea una instancia del caso de uso con los repositorios de transferencia, billetera y usuario inyectados.
     *
     * @param {ITransferRepository} transferRepository - Repositorio encargado de gestionar las transferencias.
     * @param {IWalletRepository} walletRepository - Repositorio encargado de gestionar las billeteras.
     * @param {IUserRepository} userRepository - Repositorio encargado de gestionar los usuarios.
     */
    constructor(
        @Inject("ITransferRepository")
        private transferRepository: ITransferRepository,

        @Inject("IWalletRepository")
        private walletRepository: IWalletRepository,

        @Inject("IUserRepository")
        private userRepository: IUserRepository
    ) {}

    /**
     * Ejecuta la lógica de negocio para realizar una transferencia entre billeteras.
     *
     * 1. Verifica si las billeteras de origen y destino existen y están activas.
     * 2. Verifica que el usuario sea propietario de la billetera de origen.
     * 3. Verifica que la billetera de origen tenga suficientes fondos.
     * 4. Crea la transferencia y actualiza los saldos de las billeteras de origen y destino.
     *
     * @param {TransferCreateDatabaseDto} createDto - Datos de la transferencia a crear.
     * @returns {Promise<Transfer>} - La transferencia creada.
     * @throws {NotFoundResponse} - Si no se encuentra la billetera de origen o destino, o el usuario no existe.
     * @throws {ConflictResponse} - Si hay fondos insuficientes o si se intenta transferir a la misma billetera.
     */
    async execute(createDto: TransferCreateDatabaseDto): Promise<Transfer> {
        const sourceWallet = await this.walletRepository.findByUuid(
            createDto.source_wallet_uuid
        );

        const targetWallet = await this.walletRepository.findByUuid(
            createDto.target_wallet_uuid
        );

        // Validaciones de billeteras
        if (!sourceWallet || !sourceWallet.status)
            throw new NotFoundResponse("Source Wallet not found or inactive");
        else if (!targetWallet || !targetWallet.status)
            throw new NotFoundResponse("Target Wallet not found or inactive");
        else if (sourceWallet.balance < createDto.amount)
            throw new ConflictResponse("Insufficient funds in source wallet");
        else if (createDto.source_wallet_uuid === createDto.target_wallet_uuid)
            throw new ConflictResponse("Cannot transfer to the same wallet");

        // Verificación del usuario
        const preExistuser = await this.userRepository.findByUuid(
            createDto.user_uuid
        );
        if (!preExistuser)
            throw new NotFoundResponse("Sent User doesn't exist");
        else if (preExistuser.id !== sourceWallet.user_id)
            throw new NotFoundResponse(
                "Sent Source Wallet doesn't belong to User"
            );

        // Asignación de IDs de billeteras
        createDto.source_wallet_id = sourceWallet.id;
        createDto.target_wallet_id = targetWallet.id;

        // Creación de la transferencia
        const newTransfer = await this.transferRepository.create(createDto);

        // Actualización de saldos
        sourceWallet.balance =
            Number(sourceWallet.balance) - Number(createDto.amount);
        sourceWallet.updated_at = new Date();
        await this.walletRepository.update(sourceWallet.id, sourceWallet);

        targetWallet.balance =
            Number(targetWallet.balance) + Number(createDto.amount);
        targetWallet.updated_at = new Date();
        await this.walletRepository.update(targetWallet.id, targetWallet);

        return newTransfer;
    }
}
