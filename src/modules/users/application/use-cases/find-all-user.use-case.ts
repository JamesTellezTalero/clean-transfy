import { Inject, Injectable } from "@nestjs/common";
import { User } from "../../domain/entities/user.entity";
import { IUserRepository } from "../../domain/repositories/user.respository.interface";
import { IUseCase } from "src/shared/domain/use-cases/use-case.interface";

/**
 * Caso de uso para obtener todos los usuarios.
 *
 * Este caso de uso se utiliza para recuperar una lista de todos los usuarios existentes en la base de datos.
 */
@Injectable()
export class findAllUserUseCase implements IUseCase<null, User[]> {
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
     * Ejecuta la lógica para recuperar todos los usuarios.
     *
     * @returns {Promise<User[]>} - Una promesa con la lista de todos los usuarios.
     */
    async execute(): Promise<User[]> {
        // Llamada al repositorio para obtener todos los usuarios.
        return this.userRepository.findAll();
    }
}
