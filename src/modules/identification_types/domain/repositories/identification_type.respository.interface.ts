import { IdentificationTypeCreateDatabaseDto } from "../../application/dtos/identification_type.create-database.dto";
import { IdentificationTypeUpdateDatabaseDto } from "../../application/dtos/identification_type.update-database.dto";
import { IdentificationType } from "../entities/identification_type.entity";

/**
 * Contrato que define las operaciones de persistencia
 * para la entidad `IdentificationType` dentro del dominio.
 */
export interface IIdentificationTypeRepository {
    /**
     * Busca un tipo de identificación por su identificador único.
     * @param id Identificador del tipo de identificación.
     * @returns Modelo primitivo de entidad IdentificationType.
     */
    findById(id: number): Promise<IdentificationType>;

    /**
     * Busca un tipo de identificación por su nombre.
     * @param name Nombre del tipo de identificación.
     * @returns Modelo primitivo de entidad IdentificationType.
     */
    findByName(name: string): Promise<IdentificationType>;

    /**
     * Busca un tipo de identificación por su código único.
     * @param code Código del tipo de identificación.
     * @returns Modelo primitivo de entidad IdentificationType.
     */
    findByCode(code: string): Promise<IdentificationType>;

    /**
     * Obtiene todos los tipos de identificación registrados.
     * @returns Arreglo de modelos primitivos de entidad IdentificationType.
     */
    findAll(): Promise<IdentificationType[]>;

    /**
     * Crea un nuevo tipo de identificación.
     * @param data Contenido necesario para crear un tipo de identificación.
     * @returns Modelo primitivo de entidad IdentificationType creado.
     */
    create(
        data: IdentificationTypeCreateDatabaseDto
    ): Promise<IdentificationType>;

    /**
     * Actualiza la información de un tipo de identificación existente.
     * @param id Identificador del tipo a actualizar.
     * @param data Datos a actualizar.
     * @returns Modelo primitivo de entidad IdentificationType actualizado.
     */
    update(
        id: number,
        data: IdentificationTypeUpdateDatabaseDto
    ): Promise<IdentificationType>;

    /**
     * Elimina un tipo de identificación por su identificador único.
     * @param id Identificador del tipo a eliminar.
     * @returns Promesa vacía.
     */
    delete(id: number): Promise<void>;
}
