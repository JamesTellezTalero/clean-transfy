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
import { User } from "../../domain/entities/user.entity";
import { UserLoginApiResponseDto } from "../dtos/user.login-api-response.dto";
import {
    ApiBody,
    ApiExtraModels,
    ApiOperation,
    ApiParam,
    ApiResponse,
    ApiTags,
    getSchemaPath
} from "@nestjs/swagger";
import { BadRequestResponse } from "src/shared/application/dtos/api-responses/errors/bad-request-error-response.dto";
import { ConflictResponse } from "src/shared/application/dtos/api-responses/errors/conflict-error-response.dto";
import { ForbidenResponse } from "src/shared/application/dtos/api-responses/errors/forbiden-error-response.dto";
import { UnauthorizedResponse } from "src/shared/application/dtos/api-responses/errors/unauthorized-error-response.dto";
import { mappedErrors } from "src/shared/application/utils/mapper-errors.utils";
import { NotFoundResponse } from "src/shared/application/dtos/api-responses/errors/not-found-error-response.dto";
import { findByUuidUserUseCase } from "../../application/use-cases/find-by-uuid-user.use-case";

@ApiTags("Users")
@ApiExtraModels(
    ApiResponseDto,
    SuccessResponse,
    BadRequestResponse,
    ConflictResponse,
    ForbidenResponse,
    UnauthorizedResponse,
    mappedErrors,
    User,
    UserLoginApiResponseDto
)
@Controller("user")
export class UserController {
    constructor(
        private readonly createUserUseCase: createUserUseCase,
        private readonly deleteUserUseCase: deleteUserUseCase,
        private readonly loginUserUseCase: loginUserUseCase,
        private readonly findAllUserUseCase: findAllUserUseCase,
        private readonly findByIdUserUseCase: findByIdUserUseCase,
        private readonly findByUuidUserUseCase: findByUuidUserUseCase,
        private readonly findByEmailUserUseCase: findByEmailUserUseCase,
        private readonly findByUsernameUserUseCase: findByUsernameUserUseCase,
        private readonly findByIdentificationNumberAndIdentificationTypeIdUserUseCase: findByIdentificationNumberAndIdentificationTypeIdUserUseCase,
        private readonly disableOrEnableUserUseCase: disableOrEnableUserUseCase,
        private readonly changePasswordUserUseCase: changePasswordUserUseCase,
        private readonly resetPasswordUserUseCase: resetPasswordUserUseCase,
        private readonly updateUserUseCase: updateUserUseCase
    ) {}

    @Get()
    @ApiOperation({ summary: "Find All User" })
    @ApiResponse({
        status: 200,
        description: "Find All User",
        schema: {
            allOf: [
                { $ref: getSchemaPath(SuccessResponse) },
                {
                    properties: {
                        status: { type: "number", example: 200 },
                        message: {
                            type: "string",
                            example: "findAllUser"
                        },
                        item: {
                            type: "array",
                            items: {
                                $ref: getSchemaPath(User)
                            }
                        },
                        errors: { nullable: true }
                    }
                }
            ]
        }
    })
    async findAllUser(): Promise<ApiResponseDto<User[], void>> {
        return new SuccessResponse(
            "findAllUser",
            await this.findAllUserUseCase.execute()
        );
    }

    @Get(":id")
    @ApiOperation({ summary: "Find AllFind By Id Transfer" })
    @ApiParam({ name: "id", type: "number" })
    @ApiResponse({
        status: 200,
        description: "Find By Id User",
        schema: {
            allOf: [
                { $ref: getSchemaPath(SuccessResponse) },
                {
                    properties: {
                        status: { type: "number", example: 200 },
                        message: {
                            type: "string",
                            example: "findByIdUser"
                        },
                        item: {
                            $ref: getSchemaPath(User)
                        },
                        errors: { nullable: true }
                    }
                }
            ]
        }
    })
    async findByIdUser(
        @Param("id") id: number
    ): Promise<ApiResponseDto<User, void>> {
        return new SuccessResponse(
            "findByIdUser",
            await this.findByIdUserUseCase.execute(id)
        );
    }

    @Get("uuid/:uuid")
    @ApiOperation({ summary: "Find AllFind By Uuid Transfer" })
    @ApiParam({ name: "uuid", type: "string" })
    @ApiResponse({
        status: 200,
        description: "Find By Uuid User",
        schema: {
            allOf: [
                { $ref: getSchemaPath(SuccessResponse) },
                {
                    properties: {
                        status: { type: "number", example: 200 },
                        message: {
                            type: "string",
                            example: "findByUuidUser"
                        },
                        item: {
                            $ref: getSchemaPath(User)
                        },
                        errors: { nullable: true }
                    }
                }
            ]
        }
    })
    async findByUuidUser(
        @Param("uuid") uuid: string
    ): Promise<ApiResponseDto<User, void>> {
        return new SuccessResponse(
            "findByUuidUser",
            await this.findByUuidUserUseCase.execute(uuid)
        );
    }

    @Get("email/:email")
    @ApiOperation({ summary: "Find By Email User" })
    @ApiParam({ name: "email", type: "string" })
    @ApiResponse({
        status: 200,
        description: "Find By Email User",
        schema: {
            allOf: [
                { $ref: getSchemaPath(SuccessResponse) },
                {
                    properties: {
                        status: { type: "number", example: 200 },
                        message: {
                            type: "string",
                            example: "findByEmailUser"
                        },
                        item: {
                            $ref: getSchemaPath(User)
                        },
                        errors: { nullable: true }
                    }
                }
            ]
        }
    })
    async findByEmailUser(
        @Param("email") email: string
    ): Promise<ApiResponseDto<User, void>> {
        return new SuccessResponse(
            "findByEmailUser",
            await this.findByEmailUserUseCase.execute(email)
        );
    }

    @Get("username/:username")
    @ApiOperation({ summary: "Find By Username User" })
    @ApiParam({ name: "username", type: "string" })
    @ApiResponse({
        status: 200,
        description: "Find By Username User",
        schema: {
            allOf: [
                { $ref: getSchemaPath(SuccessResponse) },
                {
                    properties: {
                        status: { type: "number", example: 200 },
                        message: {
                            type: "string",
                            example: "findByUsernameUser"
                        },
                        item: {
                            $ref: getSchemaPath(User)
                        },
                        errors: { nullable: true }
                    }
                }
            ]
        }
    })
    async findByUsernameUser(
        @Param("username") username: string
    ): Promise<ApiResponseDto<User, void>> {
        return new SuccessResponse(
            "findByUsernameUser",
            await this.findByUsernameUserUseCase.execute(username)
        );
    }

    @Get(
        "identification-number/:identification_number/identification-type-id/:identification_type_id"
    )
    @ApiOperation({
        summary: "Find By Document And Identification Type Id User"
    })
    @ApiParam({ name: "identification_number", type: "string" })
    @ApiParam({ name: "identification_type_id", type: "number" })
    @ApiResponse({
        status: 200,
        description: "Find By Document And Identification Type Id User",
        schema: {
            allOf: [
                { $ref: getSchemaPath(SuccessResponse) },
                {
                    properties: {
                        status: { type: "number", example: 200 },
                        message: {
                            type: "string",
                            example: "findByDocumentAndIdentificationTypeIdUser"
                        },
                        item: {
                            $ref: getSchemaPath(User)
                        },
                        errors: { nullable: true }
                    }
                }
            ]
        }
    })
    async findByIdentificationNumberAndIdentificationTypeIdUser(
        @Param("identification_number") identification_number: string,
        @Param("identification_type_id") identification_type_id: number
    ): Promise<ApiResponseDto<User, void>> {
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
    @ApiBody({ type: UserCreateApiDto })
    @ApiOperation({ summary: "Create User" })
    @ApiResponse({
        status: 200,
        description: "Create User",
        schema: {
            allOf: [
                { $ref: getSchemaPath(SuccessResponse) },
                {
                    properties: {
                        status: { type: "number", example: 200 },
                        message: {
                            type: "string",
                            example: "createUser"
                        },
                        item: {
                            $ref: getSchemaPath(User)
                        },
                        errors: { nullable: true }
                    }
                }
            ]
        }
    })
    @ApiResponse({
        status: 409,
        description: "User Conflict Error",
        schema: {
            allOf: [
                { $ref: getSchemaPath(ConflictResponse) },
                {
                    properties: {
                        status: { type: "number", example: 409 },
                        message: {
                            type: "string",
                            example:
                                "Email jhondoe@gmail.com presents previous Existence"
                        },
                        item: {
                            nullable: true
                        },
                        errors: {
                            nullable: true
                        }
                    }
                }
            ]
        }
    })
    async createUser(
        @Body() createUserDto: UserCreateApiDto
    ): Promise<ApiResponseDto<User, void>> {
        createUserDto = await UserCreateApiDto.FromPlain(createUserDto);
        return new SuccessResponse(
            "createUser",
            await this.createUserUseCase.execute(createUserDto)
        );
    }

    @Post("/login")
    @ApiBody({ type: UserLoginApiDto })
    @ApiOperation({ summary: "Login User" })
    @ApiResponse({
        status: 200,
        description: "Login User",
        schema: {
            allOf: [
                { $ref: getSchemaPath(SuccessResponse) },
                {
                    properties: {
                        status: { type: "number", example: 200 },
                        message: {
                            type: "string",
                            example: "loginUser"
                        },
                        item: {
                            $ref: getSchemaPath(UserLoginApiResponseDto)
                        }
                    }
                }
            ]
        }
    })
    @ApiResponse({
        status: 404,
        description: "User Not Found Error",
        schema: {
            allOf: [
                { $ref: getSchemaPath(NotFoundResponse) },
                {
                    properties: {
                        status: { type: "number", example: 404 },
                        message: {
                            type: "string",
                            example: "Sent Username or Email not found"
                        },
                        item: {
                            nullable: true
                        },
                        errors: {
                            nullable: true
                        }
                    }
                }
            ]
        }
    })
    @ApiResponse({
        status: 409,
        description: "User Conflict Error",
        schema: {
            allOf: [
                { $ref: getSchemaPath(ConflictResponse) },
                {
                    properties: {
                        status: { type: "number", example: 409 },
                        message: {
                            type: "string",
                            example: "Sent password doesn't match"
                        },
                        item: {
                            nullable: true
                        },
                        errors: {
                            nullable: true
                        }
                    }
                }
            ]
        }
    })
    async loginUser(
        @Body() loginUserDto: UserLoginApiDto
    ): Promise<ApiResponseDto<UserLoginApiResponseDto, void>> {
        loginUserDto = await UserLoginApiDto.FromPlain(loginUserDto);
        return new SuccessResponse(
            "loginUser",
            await this.loginUserUseCase.execute(loginUserDto)
        );
    }

    @Put(":uuid")
    @ApiParam({ name: "uuid", type: "string" })
    @ApiOperation({ summary: "Update User" })
    @ApiResponse({
        status: 200,
        description: "Update User",
        schema: {
            allOf: [
                { $ref: getSchemaPath(SuccessResponse) },
                {
                    properties: {
                        status: { type: "number", example: 200 },
                        message: {
                            type: "string",
                            example: "updateUser"
                        },
                        item: { $ref: getSchemaPath(User) },
                        errors: { nullable: true }
                    }
                }
            ]
        }
    })
    @ApiResponse({
        status: 404,
        description: "User Not Found Error",
        schema: {
            allOf: [
                { $ref: getSchemaPath(NotFoundResponse) },
                {
                    properties: {
                        status: { type: "number", example: 404 },
                        message: {
                            type: "string",
                            example: "Sent User doesn't exist"
                        },
                        item: {
                            nullable: true
                        },
                        errors: {
                            nullable: true
                        }
                    }
                }
            ]
        }
    })
    async updateUser(
        @Param("uuid") uuid: string,
        @Body() updateUserDto: UserUpdateApiDto
    ): Promise<ApiResponseDto<User, void>> {
        updateUserDto = await UserUpdateApiDto.FromPlain(updateUserDto);
        return new SuccessResponse(
            "updateUser",
            await this.updateUserUseCase.execute({
                uuid,
                updateDto: updateUserDto
            })
        );
    }

    @Put("reset-password/:uuid")
    @ApiParam({ name: "uuid", type: "string" })
    @ApiOperation({ summary: "Reset Password User" })
    @ApiResponse({
        status: 200,
        description: "Reset Password User",
        schema: {
            allOf: [
                { $ref: getSchemaPath(SuccessResponse) },
                {
                    properties: {
                        status: { type: "number", example: 200 },
                        message: {
                            type: "string",
                            example: "resetPasswordUser"
                        },
                        item: { nullable: true },
                        errors: { nullable: true }
                    }
                }
            ]
        }
    })
    @ApiResponse({
        status: 404,
        description: "User Not Found Error",
        schema: {
            allOf: [
                { $ref: getSchemaPath(NotFoundResponse) },
                {
                    properties: {
                        status: { type: "number", example: 404 },
                        message: {
                            type: "string",
                            example: "Sent User doesn't exist"
                        },
                        item: {
                            nullable: true
                        },
                        errors: {
                            nullable: true
                        }
                    }
                }
            ]
        }
    })
    async resetPasswordUser(
        @Param("uuid") uuid: string
    ): Promise<ApiResponseDto<void, void>> {
        return new SuccessResponse(
            "resetPasswordUser",
            await this.resetPasswordUserUseCase.execute(uuid)
        );
    }

    @Put("change-password/:uuid")
    @ApiParam({ name: "uuid", type: "string" })
    @ApiOperation({ summary: "Change Password User" })
    @ApiResponse({
        status: 200,
        description: "Change Password User",
        schema: {
            allOf: [
                { $ref: getSchemaPath(SuccessResponse) },
                {
                    properties: {
                        status: { type: "number", example: 200 },
                        message: {
                            type: "string",
                            example: "changePasswordUser"
                        },
                        item: {
                            $ref: getSchemaPath(User)
                        },
                        errors: { nullable: true }
                    }
                }
            ]
        }
    })
    @ApiResponse({
        status: 404,
        description: "User Not Found Error",
        schema: {
            allOf: [
                { $ref: getSchemaPath(NotFoundResponse) },
                {
                    properties: {
                        status: { type: "number", example: 404 },
                        message: {
                            type: "string",
                            example: "Sent User doesn't exist"
                        },
                        item: {
                            nullable: true
                        },
                        errors: {
                            nullable: true
                        }
                    }
                }
            ]
        }
    })
    @ApiResponse({
        status: 409,
        description: "User Conflict Error",
        schema: {
            allOf: [
                { $ref: getSchemaPath(ConflictResponse) },
                {
                    properties: {
                        status: { type: "number", example: 409 },
                        message: {
                            type: "string",
                            example: "Sent password is incorrect"
                        },
                        item: {
                            nullable: true
                        },
                        errors: {
                            nullable: true
                        }
                    }
                }
            ]
        }
    })
    async changePasswordUser(
        @Param("uuid") uuid: string,
        @Body() changePasswordUserDto: UserChangePasswordApiDto
    ): Promise<ApiResponseDto<User, void>> {
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
    @ApiParam({ name: "uuid", type: "string" })
    @ApiOperation({ summary: "Disable Or Enable User" })
    @ApiResponse({
        status: 200,
        description: "Disable Or Enable User",
        schema: {
            allOf: [
                { $ref: getSchemaPath(SuccessResponse) },
                {
                    properties: {
                        status: { type: "number", example: 200 },
                        message: {
                            type: "string",
                            example: "disableOrEnableUser"
                        },
                        item: {
                            $ref: getSchemaPath(User)
                        },
                        errors: { nullable: true }
                    }
                }
            ]
        }
    })
    @ApiResponse({
        status: 404,
        description: "User Not Found Error",
        schema: {
            allOf: [
                { $ref: getSchemaPath(NotFoundResponse) },
                {
                    properties: {
                        status: { type: "number", example: 404 },
                        message: {
                            type: "string",
                            example: "Sent User doesn't exist"
                        },
                        item: {
                            nullable: true
                        },
                        errors: {
                            nullable: true
                        }
                    }
                }
            ]
        }
    })
    async disableOrEnableUser(
        @Param("uuid") uuid: string
    ): Promise<ApiResponseDto<User, void>> {
        return new SuccessResponse(
            "disableOrEnableUser",
            await this.disableOrEnableUserUseCase.execute(uuid)
        );
    }

    @Delete(":uuid")
    @ApiParam({ name: "uuid", type: "string" })
    @ApiOperation({ summary: "Delete User" })
    @ApiResponse({
        status: 200,
        description: "Delete User",
        schema: {
            allOf: [
                { $ref: getSchemaPath(SuccessResponse) },
                {
                    properties: {
                        status: { type: "number", example: 200 },
                        message: {
                            type: "string",
                            example: "deleteUser"
                        },
                        item: { nullable: true },
                        errors: { nullable: true }
                    }
                }
            ]
        }
    })
    @ApiResponse({
        status: 404,
        description: "User Not Found Error",
        schema: {
            allOf: [
                { $ref: getSchemaPath(NotFoundResponse) },
                {
                    properties: {
                        status: { type: "number", example: 404 },
                        message: {
                            type: "string",
                            example: "Sent User doesn't exist"
                        },
                        item: {
                            nullable: true
                        },
                        errors: {
                            nullable: true
                        }
                    }
                }
            ]
        }
    })
    async removeUser(
        @Param("uuid") uuid: string
    ): Promise<ApiResponseDto<void, void>> {
        return new SuccessResponse(
            "removeUser",
            await this.deleteUserUseCase.execute(uuid)
        );
    }
}
