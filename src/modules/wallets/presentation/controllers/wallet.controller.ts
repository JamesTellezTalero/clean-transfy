import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    ParseUUIDPipe,
    Post,
    Put,
    Req,
    UnauthorizedException,
    UseGuards
} from "@nestjs/common";
import { ApiResponseDto } from "src/shared/application/dtos/api-responses/api-response.dto";
import { SuccessResponse } from "src/shared/application/dtos/api-responses/success-response.dto";
import { createWalletUseCase } from "../../application/use-cases/create-wallet.use-case";
import { deleteWalletUseCase } from "../../application/use-cases/delete-wallet.use-case";
import { updateWalletUseCase } from "../../application/use-cases/update-wallet.use-case";
import { findAllWalletUseCase } from "../../application/use-cases/find-all-wallet.use-case";
import { findByIdWalletUseCase } from "../../application/use-cases/find-by-id-wallet.use-case";
import { findByUuidWalletUseCase } from "../../application/use-cases/find-by-uuid-wallet.use-case";
import { findByUserIdWalletUseCase } from "../../application/use-cases/find-by-user-id-wallet.use-case";
import { findByBankIdWalletUseCase } from "../../application/use-cases/find-by-bank-id-wallet.use-case";
import { WalletUpdateAPIRequestDto } from "../dtos/wallet.update-api.dto";
import { WalletCreateAPIRequestDto } from "../dtos/wallet.create-api.dto";
import { AuthGuard } from "src/modules/auth/infrastructure/guards/auth.guard";
import { Wallet } from "../../domain/entities/wallet.entity";
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

@ApiTags("Wallets")
@ApiExtraModels(
    ApiResponseDto,
    SuccessResponse,
    BadRequestResponse,
    ConflictResponse,
    ForbidenResponse,
    UnauthorizedResponse,
    mappedErrors,
    Wallet
)
@Controller("wallet")
export class WalletController {
    constructor(
        private readonly createWalletUseCase: createWalletUseCase,
        private readonly deleteWalletUseCase: deleteWalletUseCase,
        private readonly findAllWalletUseCase: findAllWalletUseCase,
        private readonly findByIdWalletUseCase: findByIdWalletUseCase,
        private readonly findByUuidWalletUseCase: findByUuidWalletUseCase,
        private readonly findByUserIdWalletUseCase: findByUserIdWalletUseCase,
        private readonly findByBankIdWalletUseCase: findByBankIdWalletUseCase
    ) {}

    @UseGuards(AuthGuard)
    @Post()
    @ApiOperation({ summary: "Create Wallet" })
    @ApiBody({ type: WalletCreateAPIRequestDto })
    @ApiResponse({
        status: 200,
        description: "Create Wallet",
        schema: {
            allOf: [
                { $ref: getSchemaPath(SuccessResponse) },
                {
                    properties: {
                        status: { type: "number", example: 200 },
                        message: { type: "string", example: "createWallet" },
                        item: { $ref: getSchemaPath(Wallet) },
                        errors: { nullable: true }
                    }
                }
            ]
        }
    })
    @ApiResponse({
        status: 400,
        description: "Incomplete Fields",
        schema: {
            allOf: [
                { $ref: getSchemaPath(BadRequestResponse) },
                {
                    properties: {
                        status: { type: "number", example: 400 },
                        message: {
                            type: "string",
                            example: "Incomplete Fields"
                        },
                        item: {
                            type: "any",
                            nullable: true
                        },
                        errors: {
                            type: "array",
                            items: {
                                $ref: getSchemaPath(mappedErrors)
                            }
                        }
                    }
                }
            ]
        }
    })
    @ApiResponse({
        status: 404,
        description: "Wallet Not Found Error",
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
        description: "Wallet Conflict Error",
        schema: {
            allOf: [
                { $ref: getSchemaPath(ConflictResponse) },
                {
                    properties: {
                        status: { type: "number", example: 409 },
                        message: {
                            type: "string",
                            example: "Sent User already has this Bank Wallet"
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
        status: 403,
        description: "Wallet Forbiden Error",
        schema: {
            allOf: [
                { $ref: getSchemaPath(ForbidenResponse) },
                {
                    properties: {
                        status: { type: "number", example: 403 },
                        message: {
                            type: "string",
                            example: "No token provided"
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
        status: 401,
        description: "Wallet Unauthorized Error",
        schema: {
            allOf: [
                { $ref: getSchemaPath(UnauthorizedException) },
                {
                    properties: {
                        status: { type: "number", example: 401 },
                        message: {
                            type: "string",
                            example: "Invalid or expired token"
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
    async createWallet(
        @Body()
        createWalletDto: WalletCreateAPIRequestDto
    ): Promise<ApiResponseDto<Wallet, void>> {
        createWalletDto =
            await WalletCreateAPIRequestDto.FromPlain(createWalletDto);
        return new SuccessResponse(
            "createWallet",
            await this.createWalletUseCase.execute(createWalletDto)
        );
    }

    @Get()
    @ApiOperation({ summary: "Find All Wallet" })
    @ApiResponse({
        status: 200,
        description: "Find All Wallet",
        schema: {
            allOf: [
                { $ref: getSchemaPath(SuccessResponse) },
                {
                    properties: {
                        status: { type: "number", example: 200 },
                        message: {
                            type: "string",
                            example: "findAllWallet"
                        },
                        item: {
                            type: "array",
                            items: {
                                $ref: getSchemaPath(Wallet)
                            }
                        },
                        errors: { nullable: true }
                    }
                }
            ]
        }
    })
    async findAllWallet(): Promise<ApiResponseDto<Wallet[], void>> {
        return new SuccessResponse(
            "findAllWallet",
            await this.findAllWalletUseCase.execute()
        );
    }

    @Get(":id")
    @ApiParam({ name: "id", type: "number" })
    @ApiOperation({ summary: "Find By Id Wallet" })
    @ApiResponse({
        status: 200,
        description: "Find By Id Wallet",
        schema: {
            allOf: [
                { $ref: getSchemaPath(SuccessResponse) },
                {
                    properties: {
                        status: { type: "number", example: 200 },
                        message: {
                            type: "string",
                            example: "findByIdWallet"
                        },
                        item: {
                            $ref: getSchemaPath(Wallet)
                        },
                        errors: { nullable: true }
                    }
                }
            ]
        }
    })
    async findByIdWallet(
        @Param("id") id: number
    ): Promise<ApiResponseDto<Wallet, void>> {
        return new SuccessResponse(
            "findByIdWallet",
            await this.findByIdWalletUseCase.execute(id)
        );
    }

    @Get("uuid/:uuid")
    @ApiParam({ name: "uuid", type: "string" })
    @ApiOperation({ summary: "Find By Uuid Wallet" })
    @ApiResponse({
        status: 200,
        description: "Find By Uuid Wallet",
        schema: {
            allOf: [
                { $ref: getSchemaPath(SuccessResponse) },
                {
                    properties: {
                        status: { type: "number", example: 200 },
                        message: {
                            type: "string",
                            example: "findByUuidWallet"
                        },
                        item: {
                            type: "array",
                            items: {
                                $ref: getSchemaPath(Wallet)
                            }
                        },
                        errors: { nullable: true }
                    }
                }
            ]
        }
    })
    async findByUuidWallet(
        @Param("uuid") uuid: string
    ): Promise<ApiResponseDto<Wallet, void>> {
        return new SuccessResponse(
            "findByUuidWallet",
            await this.findByUuidWalletUseCase.execute(uuid)
        );
    }

    @Get("user_id/:user_id")
    @ApiParam({ name: "user_id", type: "number" })
    @ApiOperation({ summary: "Find By User Id Wallet" })
    @ApiResponse({
        status: 200,
        description: "Find By User Id Wallet",
        schema: {
            allOf: [
                { $ref: getSchemaPath(SuccessResponse) },
                {
                    properties: {
                        status: { type: "number", example: 200 },
                        message: {
                            type: "string",
                            example: "findByUserIdWallet"
                        },
                        item: {
                            type: "array",
                            items: {
                                $ref: getSchemaPath(Wallet)
                            }
                        },
                        errors: { nullable: true }
                    }
                }
            ]
        }
    })
    async findByUserIdWallet(
        @Param("user_id") user_id: number
    ): Promise<ApiResponseDto<Wallet[], void>> {
        return new SuccessResponse(
            "findByUserIdWallet",
            await this.findByUserIdWalletUseCase.execute(user_id)
        );
    }

    @Get("bank_id/:bank_id")
    @ApiParam({ name: "bank_id", type: "number" })
    @ApiOperation({ summary: "Find By Bank Id Wallet" })
    @ApiResponse({
        status: 200,
        description: "Find By Bank Id Wallet",
        schema: {
            allOf: [
                { $ref: getSchemaPath(SuccessResponse) },
                {
                    properties: {
                        status: { type: "number", example: 200 },
                        message: {
                            type: "string",
                            example: "findByBankIdWallet"
                        },
                        item: {
                            type: "array",
                            items: {
                                $ref: getSchemaPath(Wallet)
                            }
                        },
                        errors: { nullable: true }
                    }
                }
            ]
        }
    })
    async findByBankIdWallet(
        @Param("bank_id") bank_id: number
    ): Promise<ApiResponseDto<Wallet[], void>> {
        return new SuccessResponse(
            "findByBankIdWallet",
            await this.findByBankIdWalletUseCase.execute(bank_id)
        );
    }

    @UseGuards(AuthGuard)
    @Delete(":uuid")
    @ApiParam({ name: "uuid", type: "string" })
    @ApiOperation({ summary: "Delete Wallet" })
    @ApiResponse({
        status: 200,
        description: "Delete Wallet",
        schema: {
            allOf: [
                { $ref: getSchemaPath(SuccessResponse) },
                {
                    properties: {
                        status: { type: "number", example: 200 },
                        message: {
                            type: "string",
                            example: "deleteWallet"
                        },
                        item: {
                            type: "array",
                            items: {
                                $ref: getSchemaPath(Wallet)
                            }
                        },
                        errors: { nullable: true }
                    }
                }
            ]
        }
    })
    @ApiResponse({
        status: 404,
        description: "Wallet Not Found Error",
        schema: {
            allOf: [
                { $ref: getSchemaPath(NotFoundResponse) },
                {
                    properties: {
                        status: { type: "number", example: 404 },
                        message: {
                            type: "string",
                            example: "Sent Wallet doesn't exist"
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
        status: 403,
        description: "Wallet Forbiden Error",
        schema: {
            allOf: [
                { $ref: getSchemaPath(ForbidenResponse) },
                {
                    properties: {
                        status: { type: "number", example: 403 },
                        message: {
                            type: "string",
                            example: "No token provided"
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
        status: 401,
        description: "Wallet Unauthorized Error",
        schema: {
            allOf: [
                { $ref: getSchemaPath(UnauthorizedException) },
                {
                    properties: {
                        status: { type: "number", example: 401 },
                        message: {
                            type: "string",
                            example: "Invalid or expired token"
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
    async removeWallet(
        @Param("uuid", ParseUUIDPipe) uuid: string,
        @Body("user_uuid", ParseUUIDPipe) user_uuid: string
    ): Promise<ApiResponseDto<void, void>> {
        return new SuccessResponse(
            "removeWallet",
            await this.deleteWalletUseCase.execute({
                wallet_uuid: uuid,
                user_uuid
            })
        );
    }
}
