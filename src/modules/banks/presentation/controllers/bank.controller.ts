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
import { NotFoundResponse } from "src/shared/application/dtos/api-responses/errors/not-found-error-response.dto";
import { CreateBankUseCase } from "../../application/use-cases/create-bank.use-case";
import { DeleteBankUseCase } from "../../application/use-cases/delete-bank.use-case";
import { UpdateBankUseCase } from "../../application/use-cases/update-bank.use-case";
import { FindAllBanksUseCase } from "../../application/use-cases/find-all-bank.use-case";
import { FindBankByIdUseCase } from "../../application/use-cases/find-by-id-bank.use-case";
import { FindBankByNameUseCase } from "../../application/use-cases/find-by-name-bank.use-case";
import { FindBankByCodeUseCase } from "../../application/use-cases/find-by-code-bank.use-case";

/**
 * Controlador para la gestión de bancos.
 * Expone endpoints RESTful para crear, actualizar, consultar y eliminar bancos.
 *
 * Cada método retorna una respuesta estructurada mediante `SuccessResponse`,
 * y puede lanzar errores estándar como BadRequest, Conflict o NotFound.
 */
@ApiTags("Banks")
@ApiExtraModels(
    ApiResponseDto,
    SuccessResponse,
    BadRequestResponse,
    ConflictResponse,
    NotFoundResponse,
    mappedErrors,
    Bank
)
@Controller("bank")
export class BankController {
    constructor(
        private readonly createBankUseCase: CreateBankUseCase,
        private readonly deleteBankUseCase: DeleteBankUseCase,
        private readonly updateBankUseCase: UpdateBankUseCase,
        private readonly findAllBankUseCase: FindAllBanksUseCase,
        private readonly FindBankByIdUseCase: FindBankByIdUseCase,
        private readonly findBankByNameUseCase: FindBankByNameUseCase,
        private readonly findBankByCodeUseCase: FindBankByCodeUseCase
    ) {}

    /**
     * Crea un nuevo banco.
     *
     * @param {BankCreateAPIRequestDto} createBankDto - DTO con la información del banco.
     * @returns {ApiResponseDto<Bank, void>} Banco creado envuelto en respuesta estandarizada.
     * @throw {ConflictResponse} En caso de preexistencias por namo o code
     */
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
                        status: { type: "number", example: 409 },
                        message: {
                            type: "string",
                            example: "Sent Bank name already exist"
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

    /**
     * Consulta todos los bancos.
     *
     * @returns {ApiResponseDto<Bank[], void>} Arreglo de bancos encontrados.
     */
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

    /**
     * Consulta un banco por su ID.
     *
     * @param {number} id - Identificador del banco.
     * @returns {ApiResponseDto<Bank, void>} Banco encontrado.
     */
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
            await this.FindBankByIdUseCase.execute(id)
        );
    }

    /**
     * Consulta un banco por su nombre.
     *
     * @param {string} name - Nombre del banco.
     * @returns {ApiResponseDto<Bank, void>} Banco encontrado
     */
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
            await this.findBankByNameUseCase.execute(name)
        );
    }

    /**
     * Consulta un banco por su código.
     *
     * @param {string} code - Código único del banco.
     * @returns {ApiResponseDto<Bank, void>} Banco encontrado
     */
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
            await this.findBankByCodeUseCase.execute(code)
        );
    }

    /**
     * Actualiza un banco existente.
     *
     * @param {number} id - ID del banco a actualizar.
     * @param {BankUpdateAPIRequestDto} updateBankDto - DTO con los datos actualizados.
     * @returns {ApiResponseDto<Bank, void>} Banco actualizado.
     * @throw {NotFoundResponse} En caso de no existir el banco
     */
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
    @ApiResponse({
        status: 404,
        description: "Bank Not Found Error",
        schema: {
            allOf: [
                { $ref: getSchemaPath(NotFoundResponse) },
                {
                    properties: {
                        status: { type: "number", example: 404 },
                        message: {
                            type: "string",
                            example: "Sent Bank doesn't exist"
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

    /**
     * Elimina un banco por su ID.
     *
     * @param {number} id - ID del banco a eliminar.
     * @returns {ApiResponseDto<null, void>} Confirmación de eliminación
     * @throw {NotFoundResponse} En caso de no existir el banco
     */
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
    @ApiResponse({
        status: 404,
        description: "Bank Not Found Error",
        schema: {
            allOf: [
                { $ref: getSchemaPath(NotFoundResponse) },
                {
                    properties: {
                        status: { type: "number", example: 404 },
                        message: {
                            type: "string",
                            example: "Sent Bank doesn't exist"
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
    async removeBank(
        @Param("id") id: number
    ): Promise<ApiResponseDto<void, void>> {
        return new SuccessResponse(
            "removeBank",
            await this.deleteBankUseCase.execute(id)
        );
    }
}
