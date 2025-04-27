import { Body, Controller, Get, Param, Post, UseGuards } from "@nestjs/common";
import { ApiResponseDto } from "src/shared/application/dtos/api-responses/api-response.dto";
import { SuccessResponse } from "src/shared/application/dtos/api-responses/success-response.dto";
import { TopUpCreateAPIRequestDto } from "../dtos/top_up.create-api.dto";
import { createTopUpUseCase } from "../../application/use-cases/create-top_up.use-case";
import { findByAllTopUpUseCase } from "../../application/use-cases/find-by-all-top_up.use-case";
import { findByIdTopUpUseCase } from "../../application/use-cases/find-by-id-top_up.use-case";
import { findByWalletIdTopUpUseCase } from "../../application/use-cases/find-by-wallet-id-top_up.use-case";
import { AuthGuard } from "src/modules/auth/infrastructure/guards/auth.guard";
import { TopUp } from "../../domain/entities/top_up.entity";
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

@ApiTags("Top Ups")
@ApiExtraModels(
    ApiResponseDto,
    SuccessResponse,
    BadRequestResponse,
    ConflictResponse,
    NotFoundResponse,
    mappedErrors,
    TopUp
)
@Controller("top-up")
export class TopUpController {
    constructor(
        private readonly createTopUpUseCase: createTopUpUseCase,
        private readonly findAllTopUpUseCase: findByAllTopUpUseCase,
        private readonly findByIdTopUpUseCase: findByIdTopUpUseCase,
        private readonly findByWalletIdTopUpUseCase: findByWalletIdTopUpUseCase
    ) {}

    @UseGuards(AuthGuard)
    @Post("/")
    @ApiOperation({ summary: "Create Top Up" })
    @ApiBody({ type: TopUpCreateAPIRequestDto })
    @ApiResponse({
        status: 200,
        description: "Create Top Up",
        schema: {
            allOf: [
                { $ref: getSchemaPath(SuccessResponse) },
                {
                    properties: {
                        status: { type: "number", example: 200 },
                        message: { type: "string", example: "createBank" },
                        item: { $ref: getSchemaPath(TopUp) },
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
        description: "Top Up Not Found Error",
        schema: {
            allOf: [
                { $ref: getSchemaPath(NotFoundResponse) },
                {
                    properties: {
                        status: { type: "number", example: 404 },
                        message: {
                            type: "string",
                            example: "Wallet not found or inactive"
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
    async createTopUp(
        @Body()
        createTopUpDto: TopUpCreateAPIRequestDto
    ): Promise<ApiResponseDto<TopUp, void>> {
        createTopUpDto =
            await TopUpCreateAPIRequestDto.FromPlain(createTopUpDto);
        return new SuccessResponse(
            "createTopUp",
            await this.createTopUpUseCase.execute(createTopUpDto)
        );
    }

    @Get("/")
    @ApiOperation({ summary: "Find All Top Ups" })
    @ApiResponse({
        status: 200,
        description: "Find All Top Ups",
        schema: {
            allOf: [
                { $ref: getSchemaPath(SuccessResponse) },
                {
                    properties: {
                        status: { type: "number", example: 200 },
                        message: {
                            type: "string",
                            example: "findAllTopUp"
                        },
                        item: {
                            type: "array",
                            items: {
                                $ref: getSchemaPath(TopUp)
                            }
                        },
                        errors: { nullable: true }
                    }
                }
            ]
        }
    })
    async findAllTopUp(): Promise<ApiResponseDto<TopUp[], void>> {
        return new SuccessResponse(
            "findAllTopUp",
            await this.findAllTopUpUseCase.execute()
        );
    }

    @Get(":id")
    @ApiOperation({ summary: "Find By Id Top Up" })
    @ApiParam({ name: "id", type: "number" })
    @ApiResponse({
        status: 200,
        description: "Find By Id Top Up",
        schema: {
            allOf: [
                { $ref: getSchemaPath(SuccessResponse) },
                {
                    properties: {
                        status: { type: "number", example: 200 },
                        message: {
                            type: "string",
                            example: "findByIdTopUp"
                        },
                        item: { $ref: getSchemaPath(TopUp) },
                        errors: { nullable: true }
                    }
                }
            ]
        }
    })
    async findByIdTopUp(
        @Param("id") id: number
    ): Promise<ApiResponseDto<TopUp, void>> {
        return new SuccessResponse(
            "findByIdTopUp",
            await this.findByIdTopUpUseCase.execute(id)
        );
    }

    @Get("wallet_id/:wallet_id")
    @ApiOperation({ summary: "Find By Wallet Id Top Up" })
    @ApiParam({ name: "wallet_id", type: "number" })
    @ApiResponse({
        status: 200,
        description: "Find By Wallet Id Top Up",
        schema: {
            allOf: [
                { $ref: getSchemaPath(SuccessResponse) },
                {
                    properties: {
                        status: { type: "number", example: 200 },
                        message: {
                            type: "string",
                            example: "findByWalletIdTopUp"
                        },
                        item: {
                            type: "array",
                            items: {
                                $ref: getSchemaPath(TopUp)
                            }
                        },
                        errors: { nullable: true }
                    }
                }
            ]
        }
    })
    async findByWalletIdTopUp(
        @Param("wallet_id") wallet_id: number
    ): Promise<ApiResponseDto<TopUp[], void>> {
        return new SuccessResponse(
            "findByWalletIdTopUp",
            await this.findByWalletIdTopUpUseCase.execute(wallet_id)
        );
    }
}
