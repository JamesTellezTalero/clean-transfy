import { TopUpCreateDatabaseDto } from "../../application/dtos/top_up.create-database.dto";
import { TopUp } from "../entities/top_up.entity";

/**
 * Contrato que define las operaciones de persistencia
 * para la entidad `TopUp` dentro del dominio.
 */
export interface ITopUpRepository {
    /**
     * Busca una recarga por su identificador único.
     * @param id Identificador de la recarga.
     * @returns Modelo primitivo de entidad TopUp.
     */
    findById(id: number): Promise<TopUp>;

    /**
     * Obtiene todas las recargas asociadas a una billetera específica.
     * @param id Identificador de la billetera.
     * @returns Arreglo de modelos primitivos de entidad TopUp.
     */
    findByWalletId(id: number): Promise<TopUp[]>;

    /**
     * Obtiene todas las recargas registradas en el sistema.
     * @returns Arreglo de modelos primitivos de entidad TopUp.
     */
    findAll(): Promise<TopUp[]>;

    /**
     * Crea una nueva recarga.
     * @param data Datos necesarios para registrar la recarga.
     * @returns Modelo primitivo de entidad TopUp creada.
     */
    create(data: TopUpCreateDatabaseDto): Promise<TopUp>;
}
