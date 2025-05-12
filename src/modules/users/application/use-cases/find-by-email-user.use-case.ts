import { Inject, Injectable } from "@nestjs/common";
import { User } from "../../domain/entities/user.entity";
import { IUseCase } from "src/shared/domain/use-cases/use-case.interface";
import { IUserRepository } from "../../domain/repositories/user.respository.interface";

/**
 * Caso de uso para obtener un usuario por su correo electrónico.
 *
 * Este caso de uso se utiliza para recuperar un usuario de la base de datos basado en su correo electrónico.
 */
@Injectable()
export class findByEmailUserUseCase implements IUseCase<string, User> {
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
     * Ejecuta la lógica para obtener un usuario basado en su correo electrónico.
     *
     * @param {string} email - El correo electrónico del usuario que se busca.
     * @returns {Promise<User>} - Una promesa con el usuario encontrado.
     */
    async execute(email: string): Promise<User> {
        // Llamada al repositorio para buscar el usuario por su correo electrónico.
        return this.userRepository.findByEmail(email);
    }
}
