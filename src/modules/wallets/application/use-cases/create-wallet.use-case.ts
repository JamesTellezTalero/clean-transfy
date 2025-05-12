import { Inject, Injectable } from "@nestjs/common";
import { IUseCase } from "src/shared/domain/use-cases/use-case.interface";
import { WalletCreateDatabaseDto } from "../dtos/wallet.create-database.dto";
import { Wallet } from "../../domain/entities/wallet.entity";
import { IWalletRepository } from "../../domain/repositories/wallet.respository.interface";
import { ConflictResponse } from "src/shared/application/dtos/api-responses/errors/conflict-error-response.dto";
import { IUserRepository } from "src/modules/users/domain/repositories/user.respository.interface";
import { IBankRepository } from "src/modules/banks/domain/repositories/bank.respository.interface";
import { NotFoundResponse } from "src/shared/application/dtos/api-responses/errors/not-found-error-response.dto";

/**
 * Caso de uso para crear una nueva billetera de usuario.
 *
 * Este caso de uso se encarga de verificar si el usuario y el banco existen en la base de datos,
 * validar si el usuario ya tiene una billetera asociada con el banco proporcionado y, si no es así,
 * crear una nueva billetera en la base de datos.
 *
 * @class createWalletUseCase
 */
@Injectable()
export class createWalletUseCase
    implements IUseCase<WalletCreateDatabaseDto, Wallet>
{
    /**
     * Constructor del caso de uso.
     *
     * @param {IWalletRepository} walletRepository Repositorio para manejar las operaciones CRUD de billeteras.
     * @param {IUserRepository} userRepository Repositorio para manejar las operaciones CRUD de usuarios.
     * @param {IBankRepository} bankRepository Repositorio para manejar las operaciones CRUD de bancos.
     */
    constructor(
        @Inject("IWalletRepository")
        private walletRepository: IWalletRepository,
        @Inject("IUserRepository")
        private userRepository: IUserRepository,
        @Inject("IBankRepository")
        private bankRepository: IBankRepository
    ) {}

    /**
     * Ejecuta la creación de una nueva billetera para un usuario.
     *
     * Este método recibe un DTO con la información necesaria para crear una billetera, verifica que el usuario
     * y el banco existan, y luego valida si el usuario ya tiene una billetera asociada al banco. Si no la tiene,
     * se crea una nueva billetera. En caso contrario, se lanza un error de conflicto.
     *
     * @param {WalletCreateDatabaseDto} dto DTO que contiene los datos necesarios para crear una billetera.
     * @returns {Promise<Wallet>} Retorna la billetera creada.
     * @throws {NotFoundResponse} Si no se encuentra el usuario o el banco en la base de datos.
     * @throws {ConflictResponse} Si el usuario ya tiene una billetera asociada al banco.
     */
    async execute(dto: WalletCreateDatabaseDto): Promise<Wallet> {
        const preExistuser = await this.userRepository.findByUuid(
            dto.user_uuid
        );
        const preExistBank = await this.bankRepository.findById(dto.bank_id);

        if (!preExistuser)
            throw new NotFoundResponse("Sent User doesn't exist");
        else if (!preExistBank)
            throw new NotFoundResponse("Sent Bank doesn't exist");

        const preExistWallet =
            await this.walletRepository.findByBankIdAndUserId(
                dto.bank_id,
                preExistuser?.id
            );

        dto.user_id = preExistuser.id;

        if (preExistWallet)
            throw new ConflictResponse(
                "Sent User already has this Bank Wallet"
            );
        else return this.walletRepository.create(dto);
    }
}
