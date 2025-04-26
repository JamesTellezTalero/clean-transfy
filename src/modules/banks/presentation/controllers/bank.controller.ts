import {
    Body,
    Controller,
    Delete,
    Get,
    HttpStatus,
    Param,
    Post,
    Put
} from "@nestjs/common";
import { ApiResponseDto } from "src/shared/application/dtos/api-responses/api-response.dto";
import { SuccessResponse } from "src/shared/application/dtos/api-responses/success-response.dto";
import { createBankUseCase } from "../../application/use-cases/create-bank.use-case";
import { deleteBankUseCase } from "../../application/use-cases/delete-bank.use-case";
import { findByAllBankUseCase } from "../../application/use-cases/find-by-all-bank.use-case";
import { findByIdBankUseCase } from "../../application/use-cases/find-by-id-bank.use-case";
import { findByNameBankUseCase } from "../../application/use-cases/find-by-name-bank.use-case";
import { findByCodeBankUseCase } from "../../application/use-cases/find-by-code-bank.use-case";
import { updateBankUseCase } from "../../application/use-cases/update-bank.use-case";
import { BankCreateAPIRequestDto } from "../dto/bank.create-api.dto";
import { BankUpdateAPIRequestDto } from "../dto/bank.update-api.dto";
import {
    ApiBody,
    ApiExtraModels,
    ApiOperation,
    ApiParam,
    ApiResponse,
    ApiTags,
    getSchemaPath
} from "@nestjs/swagger";
import { Bank } from "../../domain/entities/bank.entity";
import { mappedErrors } from "src/shared/application/utils/mapper-errors.utils";
import { BadRequestResponse } from "src/shared/application/dtos/api-responses/errors/bad-request-error-response.dto";
import { ConflictResponse } from "src/shared/application/dtos/api-responses/errors/conflict-error-response.dto";

@ApiTags("Banks")
@ApiExtraModels(
    ApiResponseDto,
    SuccessResponse,
    BadRequestResponse,
    ConflictResponse,
    mappedErrors,
    Bank
)
@Controller("bank")
export class BankController {
    constructor(
        private readonly createBankUseCase: createBankUseCase,
        private readonly deleteBankUseCase: deleteBankUseCase,
        private readonly updateBankUseCase: updateBankUseCase,
        private readonly findAllBankUseCase: findByAllBankUseCase,
        private readonly findByIdBankUseCase: findByIdBankUseCase,
        private readonly findByNameBankUseCase: findByNameBankUseCase,
        private readonly findByCodeBankUseCase: findByCodeBankUseCase
    ) {}

    @Post()
    @ApiOperation({ summary: "Create Bank" })
    @ApiBody({ type: BankCreateAPIRequestDto })
    @ApiResponse({
        status: 200,
        description: "Create Bank",
        schema: {
            allOf: [
                { $ref: getSchemaPath(SuccessResponse) },
                {
                    properties: {
                        status: { type: "number", example: 200 },
                        message: { type: "string", example: "createBank" },
                        item: { $ref: getSchemaPath(Bank) },
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
        status: 409,
        description: "Bank Conflict Error",
        schema: {
            allOf: [
                { $ref: getSchemaPath(ConflictResponse) },
                {
                    properties: {
                        status: { type: "number", example: 400 },
                        message: {
                            type: "string",

                            examples: ["Sent Bank name already exist"]
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
    async createBank(
        @Body()
        createBankDto: BankCreateAPIRequestDto
    ): Promise<ApiResponseDto<Bank, void>> {
        createBankDto = await BankCreateAPIRequestDto.FromPlain(createBankDto);
        return new SuccessResponse(
            "createBank",
            await this.createBankUseCase.execute(createBankDto)
        );
    }

    @Get()
    @ApiOperation({ summary: "Find All Bank" })
    @ApiResponse({
        status: 200,
        description: "Find All Bank",
        schema: {
            allOf: [
                { $ref: getSchemaPath(SuccessResponse) },
                {
                    properties: {
                        status: { type: "number", example: 200 },
                        message: { type: "string", example: "findAllBank" },
                        item: {
                            type: "array",
                            items: { $ref: getSchemaPath(Bank) }
                        },
                        errors: { nullable: true }
                    }
                }
            ]
        }
    })
    async findAllBank(): Promise<ApiResponseDto<Bank[], void>> {
        return new SuccessResponse(
            "findAllBank",
            await this.findAllBankUseCase.execute()
        );
    }

    @Get(":id")
    @ApiOperation({ summary: "Find By Id Bank" })
    @ApiParam({ name: "id", type: "number" })
    @ApiResponse({
        status: 200,
        description: "Find By Id Bank",
        schema: {
            allOf: [
                { $ref: getSchemaPath(SuccessResponse) },
                {
                    properties: {
                        status: { type: "number", example: 200 },
                        message: { type: "string", example: "findByIdBank" },
                        item: {
                            $ref: getSchemaPath(Bank)
                        },
                        errors: { nullable: true }
                    }
                }
            ]
        }
    })
    async findByIdBank(
        @Param("id") id: number
    ): Promise<ApiResponseDto<Bank, void>> {
        return new SuccessResponse(
            "findByIdBank",
            await this.findByIdBankUseCase.execute(id)
        );
    }

    @Get("name/:name")
    @ApiOperation({ summary: "Find By Name Bank" })
    @ApiParam({ name: "name", type: "string" })
    @ApiResponse({
        status: 200,
        description: "Find By Name Bank",
        schema: {
            allOf: [
                { $ref: getSchemaPath(SuccessResponse) },
                {
                    properties: {
                        status: { type: "number", example: 200 },
                        message: { type: "string", example: "findByNameBank" },
                        item: {
                            $ref: getSchemaPath(Bank)
                        },
                        errors: { nullable: true }
                    }
                }
            ]
        }
    })
    async findByNameBank(
        @Param("name") name: string
    ): Promise<ApiResponseDto<Bank, void>> {
        return new SuccessResponse(
            "findByNameBank",
            await this.findByNameBankUseCase.execute(name)
        );
    }

    @Get("code/:code")
    @ApiOperation({ summary: "Find By Code Bank" })
    @ApiParam({ name: "code", type: "string" })
    @ApiResponse({
        status: 200,
        description: "Find By Code Bank",
        schema: {
            allOf: [
                { $ref: getSchemaPath(SuccessResponse) },
                {
                    properties: {
                        status: { type: "number", example: 200 },
                        message: { type: "string", example: "findByCodeBank" },
                        item: {
                            $ref: getSchemaPath(Bank)
                        },
                        errors: { nullable: true }
                    }
                }
            ]
        }
    })
    async findByCodeBank(
        @Param("code") code: string
    ): Promise<ApiResponseDto<Bank, void>> {
        return new SuccessResponse(
            "findByCodeBank",
            await this.findByCodeBankUseCase.execute(code)
        );
    }

    @Put(":id")
    @ApiOperation({ summary: "Update Bank" })
    @ApiParam({ name: "id", type: "number" })
    @ApiBody({ type: BankUpdateAPIRequestDto })
    @ApiResponse({
        status: 200,
        description: "Update Bank",
        schema: {
            allOf: [
                { $ref: getSchemaPath(SuccessResponse) },
                {
                    properties: {
                        status: { type: "number", example: 200 },
                        message: { type: "string", example: "updateBank" },
                        item: {
                            $ref: getSchemaPath(Bank)
                        },
                        errors: { nullable: true }
                    }
                }
            ]
        }
    })
    async updateBank(
        @Param("id") id: number,
        @Body()
        updateBankDto: BankUpdateAPIRequestDto
    ): Promise<ApiResponseDto<Bank, void>> {
        updateBankDto = await BankUpdateAPIRequestDto.FromPlain(updateBankDto);
        return new SuccessResponse(
            "updateBank",
            await this.updateBankUseCase.execute({
                id,
                dto: updateBankDto
            })
        );
    }

    @Delete(":id")
    @ApiOperation({ summary: "Remove Bank" })
    @ApiParam({ name: "id", type: "number" })
    @ApiResponse({
        status: 200,
        description: "Remove Bank",
        schema: {
            allOf: [
                { $ref: getSchemaPath(SuccessResponse) },
                {
                    properties: {
                        status: { type: "number", example: 200 },
                        message: { type: "string", example: "removeBank" },
                        item: {
                            nullable: true
                        },
                        errors: { nullable: true }
                    }
                }
            ]
        }
    })
    async removeBank(
        @Param("id") id: number
    ): Promise<ApiResponseDto<void, void>> {
        return new SuccessResponse(
            "removeBank",
            await this.deleteBankUseCase.execute(id)
        );
    }
}
