import { Inject, Injectable } from "@nestjs/common";
import { IUserRepository } from "../../domain/repositories/user.respository.interface";
import { IUseCase } from "src/shared/domain/use-cases/use-case.interface";
import { NotFoundResponse } from "src/shared/application/dtos/api-responses/errors/not-found-error-response.dto";
import { HashUtils } from "src/shared/infrastructure/utils/hash.utils";
import { StringUtils } from "src/shared/domain/utils/string.utils";

/**
 * Caso de uso para restablecer la contraseña de un usuario.
 *
 * Este caso de uso se encarga de generar una nueva contraseña aleatoria para un usuario identificado por su `uuid`.
 * La nueva contraseña es luego hasheada y actualizada en la base de datos.
 *
 * @class resetPasswordUserUseCase
 */
@Injectable()
export class resetPasswordUserUseCase implements IUseCase<string, void> {
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
     * Ejecuta el restablecimiento de la contraseña para el usuario.
     *
     * Este método recibe el `uuid` de un usuario, verifica si existe en la base de datos,
     * y si es encontrado, genera una nueva contraseña aleatoria, la hashea y la actualiza en el repositorio.
     *
     * @param {string} uuid Identificador único del usuario cuya contraseña se desea restablecer.
     * @returns {Promise<void>} No devuelve ningún valor.
     * @throws {NotFoundResponse} Si no se encuentra el usuario en la base de datos.
     */
    async execute(uuid: string): Promise<void> {
        // Buscar al usuario por UUID
        const UserEntity = await this.userRepository.findByUuid(uuid);

        // Si no se encuentra el usuario, lanzar un error
        if (!UserEntity) throw new NotFoundResponse("Sent User doesn't exist");

        // Generar una nueva contraseña aleatoria
        const newPassword = StringUtils.generateRandomString(15, {
            letters: true,
            numbers: true,
            specialChars: true
        });

        // Hashear la nueva contraseña
        UserEntity.password = await HashUtils.hashPassword(newPassword);
        UserEntity.updated_at = new Date();

        // Actualizar la contraseña en la base de datos
        await this.userRepository.update(UserEntity.id, UserEntity);

        // Aquí podrías agregar la lógica para enviar un correo con la nueva contraseña
        return;
    }
}
