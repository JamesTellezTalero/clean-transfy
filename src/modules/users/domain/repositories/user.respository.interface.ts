import { UserCreateDatabaseDto } from "../../application/dtos/user.create-database.dto";
import { UserUpdateDatabaseDto } from "../../application/dtos/user.update-database.dto";
import { User } from "../entities/user.entity";

/**
 * Contrato que define las operaciones de persistencia
 * para la entidad `User` dentro del dominio.
 */
export interface IUserRepository {
    /**
     * Busca un usuario por su identificador numérico.
     * @param id Identificador del usuario.
     * @returns Modelo primitivo de entidad User.
     */
    findById(id: number): Promise<User>;

    /**
     * Busca un usuario por su UUID.
     * @param uuid UUID del usuario.
     * @returns Modelo primitivo de entidad User.
     */
    findByUuid(uuid: string): Promise<User>;

    /**
     * Busca un usuario por su nombre de usuario.
     * @param username Nombre de usuario.
     * @returns Modelo primitivo de entidad User.
     */
    findByUsername(username: string): Promise<User>;

    /**
     * Busca un usuario por su correo electrónico.
     * @param email Correo electrónico del usuario.
     * @returns Modelo primitivo de entidad User.
     */
    findByEmail(email: string): Promise<User>;

    /**
     * Obtiene la contraseña encriptada de un usuario por su UUID.
     * @param uuid UUID del usuario.
     * @returns Contraseña del usuario (en texto cifrado).
     */
    findPasswordByUuid(uuid: string): Promise<string>;

    /**
     * Busca un usuario por su número y tipo de identificación.
     * @param identification Número de identificación.
     * @param identificationTypeId Identificador del tipo de identificación.
     * @returns Modelo primitivo de entidad User.
     */
    findByIdentificationNumberAndIdentificationTypeId(
        identification: string,
        identificationTypeId: number
    ): Promise<User>;

    /**
     * Obtiene todos los usuarios registrados.
     * @returns Arreglo de modelos primitivos de entidad User.
     */
    findAll(): Promise<User[]>;

    /**
     * Registra un nuevo usuario.
     * @param data Datos necesarios para la creación del usuario.
     * @returns Modelo primitivo de entidad User creada.
     */
    create(data: UserCreateDatabaseDto): Promise<User>;

    /**
     * Actualiza un usuario existente.
     * @param id Identificador del usuario a actualizar.
     * @param data Datos actualizados del usuario.
     * @returns Modelo primitivo de entidad User actualizada.
     */
    update(id: number, data: UserUpdateDatabaseDto): Promise<User>;

    /**
     * Elimina un usuario por su identificador.
     * @param id Identificador del usuario.
     */
    delete(id: number): Promise<void>;
}
