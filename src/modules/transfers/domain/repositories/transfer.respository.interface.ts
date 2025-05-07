import { TransferCreateDatabaseDto } from "../../application/dtos/transfer.create-database.dto";
import { Transfer } from "../entities/transfer.entity";

/**
 * Contrato que define las operaciones de persistencia
 * para la entidad `Transfer` dentro del dominio.
 */
export interface ITransferRepository {
    /**
     * Busca una transferencia por su identificador único.
     * @param id Identificador de la transferencia.
     * @returns Modelo primitivo de entidad Transfer.
     */
    findById(id: number): Promise<Transfer>;

    /**
     * Obtiene todas las transferencias originadas desde una billetera.
     * @param source_wallet_id Identificador de la billetera de origen.
     * @returns Arreglo de modelos primitivos de entidad Transfer.
     */
    findBySourceWalletId(source_wallet_id: number): Promise<Transfer[]>;

    /**
     * Obtiene todas las transferencias dirigidas a una billetera.
     * @param target_wallet_id Identificador de la billetera de destino.
     * @returns Arreglo de modelos primitivos de entidad Transfer.
     */
    findByTargetWalletId(target_wallet_id: number): Promise<Transfer[]>;

    /**
     * Obtiene todas las transferencias registradas en el sistema.
     * @returns Arreglo de modelos primitivos de entidad Transfer.
     */
    findAll(): Promise<Transfer[]>;

    /**
     * Registra una nueva transferencia.
     * @param data Datos necesarios para crear la transferencia.
     * @returns Modelo primitivo de entidad Transfer creada.
     */
    create(data: TransferCreateDatabaseDto): Promise<Transfer>;
}
