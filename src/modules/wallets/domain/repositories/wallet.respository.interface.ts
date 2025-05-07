import { WalletCreateDatabaseDto } from "../../application/dtos/wallet.create-database.dto";
import { WalletUpdateDatabaseDto } from "../../application/dtos/wallet.update-database.dto";
import { Wallet } from "../entities/wallet.entity";

/**
 * Contrato que define las operaciones de persistencia
 * para la entidad `Wallet` dentro del dominio.
 */
export interface IWalletRepository {
    /**
     * Busca una billetera por su identificador numérico.
     * @param id Identificador de la billetera.
     * @returns Modelo primitivo de entidad Wallet.
     */
    findById(id: number): Promise<Wallet>;

    /**
     * Busca una billetera por su UUID.
     * @param uuid UUID de la billetera.
     * @returns Modelo primitivo de entidad Wallet.
     */
    findByUuid(uuid: string): Promise<Wallet>;

    /**
     * Busca todas las billeteras asociadas a un usuario.
     * @param user_id Identificador del usuario.
     * @returns Arreglo de modelos primitivos de entidad Wallet.
     */
    findByUserId(user_id: number): Promise<Wallet[]>;

    /**
     * Busca todas las billeteras asociadas a un banco.
     * @param bank_id Identificador del banco.
     * @returns Arreglo de modelos primitivos de entidad Wallet.
     */
    findByBankId(bank_id: number): Promise<Wallet[]>;

    /**
     * Busca una billetera por banco y usuario.
     * @param bank_id Identificador del banco.
     * @param user_id Identificador del usuario.
     * @returns Modelo primitivo de entidad Wallet.
     */
    findByBankIdAndUserId(bank_id: number, user_id: number): Promise<Wallet>;

    /**
     * Obtiene todas las billeteras registradas.
     * @returns Arreglo de modelos primitivos de entidad Wallet.
     */
    findAll(): Promise<Wallet[]>;

    /**
     * Registra una nueva billetera.
     * @param data Datos necesarios para la creación de la billetera.
     * @returns Modelo primitivo de entidad Wallet creada.
     */
    create(data: WalletCreateDatabaseDto): Promise<Wallet>;

    /**
     * Actualiza una billetera existente.
     * @param id Identificador de la billetera a actualizar.
     * @param data Datos actualizados de la billetera.
     * @returns Modelo primitivo de entidad Wallet actualizada.
     */
    update(id: number, data: WalletUpdateDatabaseDto): Promise<Wallet>;

    /**
     * Elimina una billetera por su identificador.
     * @param id Identificador de la billetera.
     */
    delete(id: number): Promise<void>;
}
