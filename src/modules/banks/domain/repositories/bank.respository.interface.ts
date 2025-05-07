import { BankCreateDatabaseDto } from "../../application/dtos/bank.create-database.dto";
import { BankUpdateDatabaseDto } from "../../application/dtos/bank.update-database.dto";
import { Bank } from "../entities/bank.entity";

/**
 * Contrato que define las operaciones de persistencia
 * para la entidad `Bank` dentro del dominio.
 */
export interface IBankRepository {
    /**
     * Busca un banco por su identificador único.
     * @param id Identificador del banco.
     * @returns Modelo primitivo de entidad Bank.
     */
    findById(id: number): Promise<Bank>;

    /**
     * Busca un banco por su nombre.
     * @param name Nombre del banco.
     * @returns Modelo primitivo de entidad Bank.
     */
    findByName(name: string): Promise<Bank>;

    /**
     * Busca un banco por su código único.
     * @param code Código del banco.
     * @returns Modelo primitivo de entidad Bank.
     */
    findByCode(code: string): Promise<Bank>;

    /**
     * Obtiene todos los bancos registrados.
     * @returns Arreglo de modelos primitivos de entidad Bank.
     */
    findAll(): Promise<Bank[]>;

    /**
     * Crea un nuevo banco.
     * @param data Contenido necesario para crear un banco.
     * @returns Modelo primitivo de entidad Bank creado.
     */
    create(data: BankCreateDatabaseDto): Promise<Bank>;

    /**
     * Actualiza la información de un banco existente.
     * @param id Identificador del banco a actualizar.
     * @param data Datos a actualizar.
     * @returns Modelo primitivo de entidad Bank actualizado.
     */
    update(id: number, data: BankUpdateDatabaseDto): Promise<Bank>;

    /**
     * Elimina un banco por su identificador único.
     * @param id Identificador del banco a eliminar.
     * @returns Promesa vacía.
     */
    delete(id: number): Promise<void>;
}
