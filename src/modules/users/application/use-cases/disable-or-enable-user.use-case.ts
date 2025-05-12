import { Inject, Injectable } from "@nestjs/common";
import { IUseCase } from "src/shared/domain/use-cases/use-case.interface";
import { User } from "../../domain/entities/user.entity";
import { IUserRepository } from "../../domain/repositories/user.respository.interface";
import { NotFoundResponse } from "src/shared/application/dtos/api-responses/errors/not-found-error-response.dto";

/**
 * Caso de uso para habilitar o deshabilitar un usuario.
 *
 * Este caso de uso invierte el estado de un usuario. Si el usuario está activo, lo desactiva y viceversa.
 * Si el usuario no se encuentra en la base de datos, lanza un error de tipo NotFoundResponse.
 */
@Injectable()
export class disableOrEnableUserUseCase implements IUseCase<string, User> {
    /**
     * Crea una instancia del caso de uso con el repositorio de usuarios inyectado.
     *
     * @param {IUserRepository} userRepository - Repositorio encargado de gestionar los usuarios.
     */
    constructor(
        @Inject("IUserRepository")
        private userRepository: IUserRepository
    ) {}

    /**
     * Ejecuta la lógica para cambiar el estado (habilitar/deshabilitar) de un usuario.
     *
     * - Busca el usuario en la base de datos mediante su UUID.
     * - Si no se encuentra, lanza un error de tipo NotFoundResponse.
     * - Si el usuario existe, invierte el estado (`status`) del usuario.
     * - Actualiza la fecha de modificación (`updated_at`).
     * - Guarda los cambios en la base de datos.
     *
     * @param {string} uuid - UUID del usuario a habilitar/deshabilitar.
     * @returns {Promise<User>} - El usuario actualizado.
     * @throws {NotFoundResponse} - Si el usuario no existe.
     */
    async execute(uuid: string): Promise<User> {
        // Verificación de existencia del usuario
        const UserEntity = await this.userRepository.findByUuid(uuid);
        if (!UserEntity) throw new NotFoundResponse("Sent User doesn't exist");

        // Inversión del estado del usuario (habilitar/deshabilitar)
        UserEntity.status = !UserEntity.status;
        UserEntity.updated_at = new Date();

        // Actualización del usuario en la base de datos
        await this.userRepository.update(UserEntity.id, UserEntity);

        // Devolver el usuario actualizado
        return await this.userRepository.findById(UserEntity.id);
    }
}
