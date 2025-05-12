import { Inject, Injectable } from "@nestjs/common";
import { IUserRepository } from "../../domain/repositories/user.respository.interface";
import { IUseCase } from "src/shared/domain/use-cases/use-case.interface";
import { NotFoundResponse } from "src/shared/application/dtos/api-responses/errors/not-found-error-response.dto";

/**
 * Caso de uso para eliminar un usuario.
 *
 * Este caso de uso se encarga de verificar si el usuario existe a partir de su UUID. Si el usuario
 * no existe, lanza un error de tipo `NotFoundResponse`. Si el usuario existe, lo elimina de la base
 * de datos.
 */
@Injectable()
export class deleteUserUseCase implements IUseCase<string, void> {
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
     * Ejecuta la lógica de negocio para eliminar un usuario.
     *
     * - Verifica si el usuario existe mediante su UUID.
     * - Si el usuario no existe, lanza un error de tipo `NotFoundResponse`.
     * - Si el usuario existe, lo elimina de la base de datos.
     *
     * @param {string} uuid - UUID del usuario que se va a eliminar.
     * @returns {Promise<void>} - No devuelve ningún valor, solo realiza la eliminación.
     * @throws {NotFoundResponse} - Si el usuario no se encuentra en la base de datos.
     */
    async execute(uuid: string): Promise<void> {
        // Verificación de existencia del usuario
        const preExistUser = await this.userRepository.findByUuid(uuid);
        if (!preExistUser)
            throw new NotFoundResponse("Sent User doesn't exist");

        // Eliminación del usuario si existe
        return this.userRepository.delete(preExistUser.id);
    }
}
