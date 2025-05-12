import {
    Body,
    Controller,
    Get,
    Param,
    Post,
    UnauthorizedException,
    UseGuards
} from "@nestjs/common";
import { ApiResponseDto } from "src/shared/application/dtos/api-responses/api-response.dto";
import { SuccessResponse } from "src/shared/application/dtos/api-responses/success-response.dto";
import { TransferCreateAPIRequestDto } from "../dtos/transfer.create-api.dto";
import { createTransferUseCase } from "../../application/use-cases/create-transfer.use-case";
import { findAllTransferUseCase } from "../../application/use-cases/find-all-transfer.use-case";
import { findByIdTransferUseCase } from "../../application/use-cases/find-by-id-transfer.use-case";
import { findBySourceWalletIdTransferUseCase } from "../../application/use-cases/find-by-source-wallet-id-transfer.use-case";
import { findByTargetWalletIdTransferUseCase } from "../../application/use-cases/find-by-target-wallet-id-transfer.use-case";
import { AuthGuard } from "src/modules/auth/infrastructure/guards/auth.guard";
import { Transfer } from "../../domain/entities/transfer.entity";
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
import { mappedErrors } from "src/shared/application/utils/mapper-errors.utils";
import { NotFoundResponse } from "src/shared/application/dtos/api-responses/errors/not-found-error-response.dto";
import { ForbidenResponse } from "src/shared/application/dtos/api-responses/errors/forbiden-error-response.dto";
import { UnauthorizedResponse } from "src/shared/application/dtos/api-responses/errors/unauthorized-error-response.dto";

@ApiTags("Transfers")
@ApiExtraModels(
    ApiResponseDto,
    SuccessResponse,
    BadRequestResponse,
    ConflictResponse,
    ForbidenResponse,
    UnauthorizedResponse,
    mappedErrors,
    Transfer
)
@Controller("transfer")
export class TransferController {
    constructor(
        private readonly createTransferUseCase: createTransferUseCase,
        private readonly findAllTransferUseCase: findAllTransferUseCase,
        private readonly findByIdTransferUseCase: findByIdTransferUseCase,
        private readonly findBySourceWalletIdTransferUseCase: findBySourceWalletIdTransferUseCase,
        private readonly findByTargetWalletIdTransferUseCase: findByTargetWalletIdTransferUseCase
    ) {}

    @UseGuards(AuthGuard)
    @Post("/")
    @ApiOperation({ summary: "Create Transfer" })
    @ApiBody({ type: TransferCreateAPIRequestDto })
    @ApiResponse({
        status: 200,
        description: "Create Transfer",
        schema: {
            allOf: [
                { $ref: getSchemaPath(SuccessResponse) },
                {
                    properties: {
                        status: { type: "number", example: 200 },
                        message: { type: "string", example: "createTransfer" },
                        item: { $ref: getSchemaPath(Transfer) },
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
        description: "Transfer Not Found Error",
        schema: {
            allOf: [
                { $ref: getSchemaPath(NotFoundResponse) },
                {
                    properties: {
                        status: { type: "number", example: 404 },
                        message: {
                            type: "string",
                            example: "Source Wallet not found or inactive"
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
        description: "Transfer Conflict Error",
        schema: {
            allOf: [
                { $ref: getSchemaPath(ConflictResponse) },
                {
                    properties: {
                        status: { type: "number", example: 409 },
                        message: {
                            type: "string",
                            example: "Insufficient funds in source wallet"
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
        description: "Transfer Forbiden Error",
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
        description: "Transfer Unauthorized Error",
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
    async createTransfer(
        @Body()
        createTransferDto: TransferCreateAPIRequestDto
    ): Promise<ApiResponseDto<Transfer, void>> {
        createTransferDto =
            await TransferCreateAPIRequestDto.FromPlain(createTransferDto);
        return new SuccessResponse(
            "createTransfer",
            await this.createTransferUseCase.execute(createTransferDto)
        );
    }

    @Get("/")
    @ApiOperation({ summary: "Find All Transfer" })
    @ApiResponse({
        status: 200,
        description: "Find All Transfer",
        schema: {
            allOf: [
                { $ref: getSchemaPath(SuccessResponse) },
                {
                    properties: {
                        status: { type: "number", example: 200 },
                        message: {
                            type: "string",
                            example: "findAllTransfer"
                        },
                        item: {
                            type: "array",
                            items: {
                                $ref: getSchemaPath(Transfer)
                            }
                        },
                        errors: { nullable: true }
                    }
                }
            ]
        }
    })
    async findAllTransfer(): Promise<ApiResponseDto<Transfer[], void>> {
        return new SuccessResponse(
            "findAllTransfer",
            await this.findAllTransferUseCase.execute()
        );
    }

    @Get(":id")
    @ApiOperation({ summary: "Find By Id Transfer" })
    @ApiParam({ name: "id", type: "number" })
    @ApiResponse({
        status: 200,
        description: "Find By Id Transfer",
        schema: {
            allOf: [
                { $ref: getSchemaPath(SuccessResponse) },
                {
                    properties: {
                        status: { type: "number", example: 200 },
                        message: {
                            type: "string",
                            example: "findByIdTransfer"
                        },
                        item: {
                            $ref: getSchemaPath(Transfer)
                        },
                        errors: { nullable: true }
                    }
                }
            ]
        }
    })
    async findByIdTransfer(
        @Param("id") id: number
    ): Promise<ApiResponseDto<Transfer, void>> {
        return new SuccessResponse(
            "findByIdTransfer",
            await this.findByIdTransferUseCase.execute(id)
        );
    }

    @Get("source_wallet_id/:source_wallet_id")
    @ApiOperation({ summary: "Find By Source Wallet Id Transfer" })
    @ApiParam({ name: "source_wallet_id", type: "number" })
    @ApiResponse({
        status: 200,
        description: "Find By Source Wallet Id Transfer",
        schema: {
            allOf: [
                { $ref: getSchemaPath(SuccessResponse) },
                {
                    properties: {
                        status: { type: "number", example: 200 },
                        message: {
                            type: "string",
                            example: "findBySourceWalletIdTransfer"
                        },
                        item: {
                            type: "array",
                            items: {
                                $ref: getSchemaPath(Transfer)
                            }
                        },
                        errors: { nullable: true }
                    }
                }
            ]
        }
    })
    async findBySourceWalletIdTransfer(
        @Param("source_wallet_id") source_wallet_id: number
    ): Promise<ApiResponseDto<Transfer[], void>> {
        return new SuccessResponse(
            "findBySourceWalletIdTransfer",
            await this.findBySourceWalletIdTransferUseCase.execute(
                source_wallet_id
            )
        );
    }

    @Get("target_wallet_id/:target_wallet_id")
    @ApiOperation({ summary: "Find By Target Wallet Id Transfer" })
    @ApiParam({ name: "target_wallet_id", type: "number" })
    @ApiResponse({
        status: 200,
        description: "Find By Target Wallet Id Transfer",
        schema: {
            allOf: [
                { $ref: getSchemaPath(SuccessResponse) },
                {
                    properties: {
                        status: { type: "number", example: 200 },
                        message: {
                            type: "string",
                            example: "findByTargetWalletIdTransfer"
                        },
                        item: {
                            type: "array",
                            items: {
                                $ref: getSchemaPath(Transfer)
                            }
                        },
                        errors: { nullable: true }
                    }
                }
            ]
        }
    })
    async findByTargetWalletIdTransfer(
        @Param("target_wallet_id") target_wallet_id: number
    ): Promise<ApiResponseDto<Transfer[], void>> {
        return new SuccessResponse(
            "findByTargetWalletIdTransfer",
            await this.findByTargetWalletIdTransferUseCase.execute(
                target_wallet_id
            )
        );
    }
}
