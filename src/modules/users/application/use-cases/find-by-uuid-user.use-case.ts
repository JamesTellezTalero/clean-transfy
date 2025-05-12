import { Inject, Injectable } from "@nestjs/common";
import { User } from "../../domain/entities/user.entity";
import { IUserRepository } from "../../domain/repositories/user.respository.interface";
import { IUseCase } from "src/shared/domain/use-cases/use-case.interface";

/**
 * Caso de uso para obtener un usuario por su UUID.
 *
 * Este caso de uso se utiliza para recuperar un usuario de la base de datos basado en su UUID único.
 */
@Injectable()
export class findByUuidUserUseCase implements IUseCase<string, User> {
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
     * Ejecuta la lógica para obtener un usuario basado en su UUID.
     *
     * @param {string} uuid - El UUID único que se busca.
     * @returns {Promise<User>} - Una promesa con el usuario encontrado.
     */
    async execute(uuid: string): Promise<User> {
        // Llamada al repositorio para buscar el usuario por su UUID.
        return this.userRepository.findByUuid(uuid);
    }
}
