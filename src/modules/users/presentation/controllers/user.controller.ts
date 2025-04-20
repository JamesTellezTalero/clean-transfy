import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Post,
    Put
} from "@nestjs/common";
import { ApiResponseDto } from "src/shared/application/dtos/api-responses/api-response.dto";
import { SuccessResponse } from "src/shared/application/dtos/api-responses/success-response.dto";
import { UserLoginApiDto } from "../dtos/users.login-api.dto";
import { UserCreateApiDto } from "../dtos/users.create-api.dto";
import { UserUpdateApiDto } from "../dtos/users.update-api.dto";
import { UserChangePasswordApiDto } from "../dtos/users.change-password-api";
import { createUserUseCase } from "../../application/use-cases/create-user.use-case";
import { deleteUserUseCase } from "../../application/use-cases/delete-users.use-case";
import { loginUserUseCase } from "../../application/use-cases/login-user.use-case";
import { findAllUserUseCase } from "../../application/use-cases/find-all-user.use-case";
import { findByIdUserUseCase } from "../../application/use-cases/find-by-id-user.use-case";
import { findByEmailUserUseCase } from "../../application/use-cases/find-by-email-user.use-case";
import { findByUsernameUserUseCase } from "../../application/use-cases/find-by-username-user.use-case";
import { findByIdentificationNumberAndIdentificationTypeIdUserUseCase } from "../../application/use-cases/find-by-identification-number-and-identification-type-id-user.use-case";
import { disableOrEnableUserUseCase } from "../../application/use-cases/disable-or-enable-user.use-case";
import { changePasswordUserUseCase } from "../../application/use-cases/change-password-user.use-case";
import { resetPasswordUserUseCase } from "../../application/use-cases/reset-password-user.use-case";
import { updateUserUseCase } from "../../application/use-cases/update-user.use-case";

@Controller("user")
export class UserController {
    constructor(
        private readonly createUserUseCase: createUserUseCase,
        private readonly deleteUserUseCase: deleteUserUseCase,
        private readonly loginUserUseCase: loginUserUseCase,
        private readonly findAllUserUseCase: findAllUserUseCase,
        private readonly findByIdUserUseCase: findByIdUserUseCase,
        private readonly findByEmailUserUseCase: findByEmailUserUseCase,
        private readonly findByUsernameUserUseCase: findByUsernameUserUseCase,
        private readonly findByIdentificationNumberAndIdentificationTypeIdUserUseCase: findByIdentificationNumberAndIdentificationTypeIdUserUseCase,
        private readonly disableOrEnableUserUseCase: disableOrEnableUserUseCase,
        private readonly changePasswordUserUseCase: changePasswordUserUseCase,
        private readonly resetPasswordUserUseCase: resetPasswordUserUseCase,
        private readonly updateUserUseCase: updateUserUseCase
    ) {}

    @Get()
    async findAllUser(): Promise<ApiResponseDto> {
        return new SuccessResponse(
            "findAllUser",
            await this.findAllUserUseCase.execute()
        );
    }

    @Get(":id")
    async findByIdUser(@Param("id") id: number): Promise<ApiResponseDto> {
        return new SuccessResponse(
            "findByIdUser",
            await this.findByIdUserUseCase.execute(id)
        );
    }

    @Get("email/:email")
    async findByEmailUser(
        @Param("email") email: string
    ): Promise<ApiResponseDto> {
        return new SuccessResponse(
            "findByEmailUser",
            await this.findByEmailUserUseCase.execute(email)
        );
    }

    @Get("username/:username")
    async findByUsernameUser(
        @Param("username") username: string
    ): Promise<ApiResponseDto> {
        return new SuccessResponse(
            "findByUsernameUser",
            await this.findByUsernameUserUseCase.execute(username)
        );
    }

    @Get(
        "identification-number/:identification_number/identification-type-id/:identification_type_id"
    )
    async findByIdentificationNumberAndIdentificationTypeIdUser(
        @Param("identification_number") identification_number: string,
        @Param("identification_type_id") identification_type_id: number
    ): Promise<ApiResponseDto> {
        return new SuccessResponse(
            "findByDocumentAndIdentificationTypeIdUser",
            await this.findByIdentificationNumberAndIdentificationTypeIdUserUseCase.execute(
                {
                    identification_number,
                    identification_type_id
                }
            )
        );
    }

    @Post("/")
    async createUser(
        @Body() createUserDto: UserCreateApiDto
    ): Promise<ApiResponseDto> {
        createUserDto = await UserCreateApiDto.FromPlain(createUserDto);
        return new SuccessResponse(
            "createUser",
            await this.createUserUseCase.execute(createUserDto)
        );
    }

    @Post("/login")
    async loginUser(
        @Body() loginUserDto: UserLoginApiDto
    ): Promise<ApiResponseDto> {
        loginUserDto = await UserLoginApiDto.FromPlain(loginUserDto);
        return new SuccessResponse(
            "loginUser",
            await this.loginUserUseCase.execute(loginUserDto)
        );
    }

    @Put(":id")
    async updateUser(
        @Param("id") id: number,
        @Body() updateUserDto: UserUpdateApiDto
    ): Promise<ApiResponseDto> {
        updateUserDto = await UserUpdateApiDto.FromPlain(updateUserDto);
        return new SuccessResponse(
            "updateUser",
            await this.updateUserUseCase.execute({
                id,
                updateDto: updateUserDto
            })
        );
    }

    @Put("reset-password/:uuid")
    async resetPasswordUser(
        @Param("uuid") uuid: string
    ): Promise<ApiResponseDto> {
        return new SuccessResponse(
            "resetPasswordUser",
            await this.resetPasswordUserUseCase.execute(uuid)
        );
    }

    @Put("change-password/:uuid")
    async changePasswordUser(
        @Param("uuid") uuid: string,
        @Body() changePasswordUserDto: UserChangePasswordApiDto
    ): Promise<ApiResponseDto> {
        changePasswordUserDto = await UserChangePasswordApiDto.FromPlain(
            changePasswordUserDto
        );
        return new SuccessResponse(
            "changePasswordUser",
            await this.changePasswordUserUseCase.execute({
                uuid,
                updateDto: changePasswordUserDto
            })
        );
    }

    @Put("disable-or-enable/:uuid")
    async disableOrEnableUser(
        @Param("uuid") uuid: string
    ): Promise<ApiResponseDto> {
        return new SuccessResponse(
            "disableOrEnableUser",
            await this.disableOrEnableUserUseCase.execute(uuid)
        );
    }

    @Delete(":id")
    async removeUser(@Param("id") id: number): Promise<ApiResponseDto> {
        return new SuccessResponse(
            "removeUser",
            await this.deleteUserUseCase.execute(id)
        );
    }
}
