import { Inject, Injectable } from "@nestjs/common";
import { IUserRepository } from "../../domain/repositories/user.respository.interface";
import { IUseCase } from "src/shared/domain/use-cases/use-case.interface";
import { User } from "../../domain/entities/user.entity";

/**
 * Caso de uso para obtener un usuario por su ID.
 *
 * Este caso de uso se utiliza para recuperar un usuario de la base de datos basado en su ID.
 */
@Injectable()
export class findByIdUserUseCase implements IUseCase<number, User> {
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
     * Ejecuta la lógica para obtener un usuario basado en su ID.
     *
     * @param {number} id - El ID del usuario que se busca.
     * @returns {Promise<User>} - Una promesa con el usuario encontrado.
     */
    async execute(id: number): Promise<User> {
        // Llamada al repositorio para buscar el usuario por su ID.
        return this.userRepository.findById(id);
    }
}
