import { Inject, Injectable } from "@nestjs/common";
import { IUseCase } from "src/shared/domain/use-cases/use-case.interface";
import { UserCreateDatabaseDto } from "../dtos/user.create-database.dto";
import { User } from "../../domain/entities/user.entity";
import { IUserRepository } from "../../domain/repositories/user.respository.interface";
import { ConflictResponse } from "src/shared/application/dtos/api-responses/errors/conflict-error-response.dto";
import { HashUtils } from "src/shared/infrastructure/utils/hash.utils";

/**
 * Caso de uso para la creación de un nuevo usuario.
 *
 * Este caso de uso se encarga de verificar la existencia de un correo electrónico, nombre de usuario,
 * y un número de identificación único antes de proceder a la creación de un nuevo usuario.
 * Si alguno de estos datos ya existe, lanza un error de conflicto.
 * También, se encarga de cifrar la contraseña antes de crear el usuario en la base de datos.
 * Implementa el contrato IUseCase.
 */
@Injectable()
export class createUserUseCase
    implements IUseCase<UserCreateDatabaseDto, User>
{
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
     * Ejecuta la lógica de negocio para crear un nuevo usuario.
     *
     * - Verifica si el correo electrónico, el nombre de usuario y el número de identificación ya existen.
     * - Si alguno de estos datos ya existe, lanza un error de conflicto.
     * - Cifra la contraseña antes de almacenar el nuevo usuario en la base de datos.
     *
     * @param {UserCreateDatabaseDto} createDto - Datos necesarios para crear el nuevo usuario.
     * @returns {Promise<User>} - El usuario recién creado.
     * @throws {ConflictResponse} - Si el correo electrónico, nombre de usuario o documento ya existen.
     */
    async execute(createDto: UserCreateDatabaseDto): Promise<User> {
        // Verificación de existencia de correo electrónico
        const UserEmailPrevExistence = await this.userRepository.findByEmail(
            createDto.email
        );
        if (UserEmailPrevExistence)
            throw new ConflictResponse(
                `Email ${UserEmailPrevExistence.email} presents previous Existence`
            );

        // Verificación de existencia de nombre de usuario
        const UserUsernamePrevExistence =
            await this.userRepository.findByUsername(createDto.username);
        if (UserUsernamePrevExistence)
            throw new ConflictResponse(
                `Username ${UserUsernamePrevExistence.username} presents previous Existence`
            );

        // Verificación de existencia de documento con el tipo de identificación
        const UserDocumentAndIdentificationTypePrevExistence =
            await this.userRepository.findByIdentificationNumberAndIdentificationTypeId(
                createDto.identification_number,
                createDto.identification_type_id
            );
        if (UserDocumentAndIdentificationTypePrevExistence)
            throw new ConflictResponse(
                `Document ${UserDocumentAndIdentificationTypePrevExistence.identification_number} with Document Type Id ${UserDocumentAndIdentificationTypePrevExistence.identification_type_id} presents previous Existence`
            );

        // Cifrado de la contraseña antes de la creación
        createDto.password = await HashUtils.hashPassword(createDto.password);

        // Creación del usuario
        return this.userRepository.create(createDto);
    }
}
