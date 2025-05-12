import { Inject, Injectable } from "@nestjs/common";
import { IUseCase } from "src/shared/domain/use-cases/use-case.interface";
import { UserLoginDatabaseDto } from "../dtos/user.login-database.dto";
import { User } from "../../domain/entities/user.entity";
import { IUserRepository } from "../../domain/repositories/user.respository.interface";
import { HashUtils } from "src/shared/infrastructure/utils/hash.utils";
import { NotFoundResponse } from "src/shared/application/dtos/api-responses/errors/not-found-error-response.dto";
import { IAuthService } from "src/modules/auth/application/contracts/auth-service.interface";
import { UserLoginApiResponseDto } from "../../presentation/dtos/user.login-api-response.dto";
import { ConflictResponse } from "src/shared/application/dtos/api-responses/errors/conflict-error-response.dto";

/**
 * Caso de uso para realizar el login de un usuario.
 *
 * Este caso de uso gestiona el proceso de verificación de las credenciales de un usuario (nombre de usuario o correo electrónico, y contraseña).
 */
@Injectable()
export class loginUserUseCase
    implements IUseCase<UserLoginDatabaseDto, UserLoginApiResponseDto>
{
    /**
     * Crea una instancia del caso de uso con los repositorios y servicios inyectados.
     *
     * @param {IUserRepository} userRepository - Repositorio de usuarios para acceder a los datos.
     * @param {IAuthService} authService - Servicio de autenticación para generar el token.
     */
    constructor(
        @Inject("IUserRepository")
        private userRepository: IUserRepository,
        @Inject("IAuthService")
        private authService: IAuthService
    ) {}

    /**
     * Ejecuta la lógica de login del usuario.
     *
     * @param {UserLoginDatabaseDto} loginDto - DTO que contiene las credenciales del usuario.
     * @returns {Promise<UserLoginApiResponseDto>} - Respuesta con el usuario y el token.
     */
    async execute(
        loginDto: UserLoginDatabaseDto
    ): Promise<UserLoginApiResponseDto> {
        // Buscar al usuario por nombre de usuario o correo electrónico
        const UserPrevExist =
            (await this.userRepository.findByUsername(
                loginDto.username_or_email
            )) ||
            (await this.userRepository.findByEmail(loginDto.username_or_email));

        // Si el usuario no existe, lanzar un error
        if (!UserPrevExist)
            throw new NotFoundResponse("Sent Username or Email not found");

        // Obtener la contraseña almacenada del usuario
        const UserPasswordPrevExist =
            await this.userRepository.findPasswordByUuid(UserPrevExist.uuid);

        // Comparar la contraseña ingresada con la almacenada
        const isValidPassword = await HashUtils.comparePasswords(
            loginDto.password,
            UserPasswordPrevExist
        );

        // Si las contraseñas no coinciden, lanzar un error
        if (!isValidPassword)
            throw new ConflictResponse("Sent password doesn't match");

        // Generar el token JWT y devolver la respuesta con el usuario y el token
        return {
            user: UserPrevExist,
            token: this.authService.generateToken({
                user_uuid: UserPrevExist.uuid
            })
        };
    }
}
