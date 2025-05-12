import { Inject, Injectable } from "@nestjs/common";
import { IUseCase } from "src/shared/domain/use-cases/use-case.interface";
import { IUserRepository } from "../../domain/repositories/user.respository.interface";
import { NotFoundResponse } from "src/shared/application/dtos/api-responses/errors/not-found-error-response.dto";

/**
 * Caso de uso para validar el estado (activo/inactivo) de un usuario.
 *
 * Este caso de uso se encarga de verificar si un usuario con el `uuid` proporcionado existe en la base de datos
 * y de retornar su estado (activo o inactivo).
 *
 * @class validateStatusUserUseCase
 */
@Injectable()
export class validateStatusUserUseCase implements IUseCase<string, boolean> {
    /**
     * Constructor del caso de uso.
     *
     * @param {IUserRepository} userRepository Repositorio que maneja las operaciones CRUD de usuarios.
     */
    constructor(
        @Inject("IUserRepository")
        private userRepository: IUserRepository
    ) {}

    /**
     * Ejecuta la validación del estado de un usuario.
     *
     * Este método recibe el `uuid` de un usuario, verifica si existe en la base de datos y retorna su estado,
     * el cual puede ser verdadero (activo) o falso (inactivo).
     *
     * @param {string} uuid Identificador único del usuario cuyo estado se desea verificar.
     * @returns {Promise<boolean>} Retorna `true` si el usuario está activo, de lo contrario `false`.
     * @throws {NotFoundResponse} Si no se encuentra el usuario en la base de datos.
     */
    async execute(uuid: string): Promise<boolean> {
        // Buscar al usuario por UUID
        const UserEntity = await this.userRepository.findByUuid(uuid);

        // Si no se encuentra el usuario, lanzar un error
        if (!UserEntity) throw new NotFoundResponse("Sent User doesn't exist");

        // Retornar el estado del usuario (activo o inactivo)
        return UserEntity.status;
    }
}
