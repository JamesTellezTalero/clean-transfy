import { BankCreateDatabaseDto } from "../../application/dtos/bank.create-database.dto";
import { BankUpdateDatabaseDto } from "../../application/dtos/bank.update-database.dto";
import { Bank } from "../entities/bank.entity";

/**
 * Contrato que define las operaciones de acceso a datos
 * para la entidad `Bank` dentro del dominio.
 */
export interface IBankRepository {
    /**
     * Obtiene un banco por su identificador único.
     * @param {number} id - Identificador del banco.
     * @returns {Bank} Modelo primitivo de entidad Bank
     */
    findById(id: number): Promise<Bank>;

    /**
     * Obtiene un banco por su nombre.
     * @param {string} name - nombre del banco.
     * @returns {Bank} Modelo primitivo de entidad Bank
     */
    findByName(name: string): Promise<Bank>;

    /**
     * Obtiene un banco por su codigo único.
     * @param {string} code - codigo del banco.
     * @returns {Bank} Modelo primitivo de entidad Bank
     */
    findByCode(code: string): Promise<Bank>;

    /**
     * Obtiene todos los bancos.
     * @returns {Array<Bank>} Modelos primitivos de entidad Bank
     */
    findAll(): Promise<Bank[]>;

    /**
     * Creacion de Bancos.
     * @param {BankCreateDatabaseDto} data - contenido del banco.
     * @returns {Bank} Modelo primitivo de entidad Bank
     */
    create(data: BankCreateDatabaseDto): Promise<Bank>;

    /**
     * Actualizacion de Bancos.
     *
     * @param {{
     *      id: number,
     *      dto: BankUpdateDatabaseDto
     * }}
     * id - Id necesario para la actualizacion de bancos.
     * dto - body necesario para la actualizacion de bancos.
     *
     * @returns {Bank} Modelo primitivo de entidad Bank
     */
    update(id: number, data: BankUpdateDatabaseDto): Promise<Bank>;

    /**
     * Eliminacion de Bancos.
     * @param {number} id - identificador unico del banco.
     * @returns {void}
     */
    delete(id: number): Promise<void>;
}
