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
import { IdentificationTypeCreateAPIRequestDto } from "../dtos/identification_type.create-api.dto";
import { IdentificationTypeUpdateAPIRequestDto } from "../dtos/identification_type.update-api.dto";
import { createIdentificationTypeUseCase } from "../../application/use-cases/create-identification_types.use-case";
import { deleteIdentificationTypeUseCase } from "../../application/use-cases/delete-identification_types.use-case";
import { updateIdentificationTypeUseCase } from "../../application/use-cases/update-identification_types.use-case";
import { findByAllIdentificationTypeUseCase } from "../../application/use-cases/find-by-all-identification_types.use-case";
import { findByIdIdentificationTypeUseCase } from "../../application/use-cases/find-by-id-identification_types.use-case";
import { findByNameIdentificationTypeUseCase } from "../../application/use-cases/find-by-name-identification_types.use-case";
import { IdentificationType } from "../../domain/entities/identification_type.entity";
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
import { mappedErrors } from "src/shared/application/utils/mapper-errors.utils";
import { ConflictResponse } from "src/shared/application/dtos/api-responses/errors/conflict-error-response.dto";

@ApiTags("Identification Types")
@ApiExtraModels(
    ApiResponseDto,
    SuccessResponse,
    BadRequestResponse,
    ConflictResponse,
    IdentificationType,
    mappedErrors
)
@Controller("identification-type")
export class IdentificationTypeController {
    constructor(
        private readonly createIdentificationTypeUseCase: createIdentificationTypeUseCase,
        private readonly deleteIdentificationTypeUseCase: deleteIdentificationTypeUseCase,
        private readonly updateIdentificationTypeUseCase: updateIdentificationTypeUseCase,
        private readonly findAllIdentificationTypeUseCase: findByAllIdentificationTypeUseCase,
        private readonly findByIdIdentificationTypeUseCase: findByIdIdentificationTypeUseCase,
        private readonly findByNameIdentificationTypeUseCase: findByNameIdentificationTypeUseCase
    ) {}

    @Post()
    @ApiOperation({ summary: "Create Identification Type" })
    @ApiBody({ type: IdentificationTypeCreateAPIRequestDto })
    @ApiResponse({
        status: 200,
        description: "Create Identification Type",
        schema: {
            allOf: [
                { $ref: getSchemaPath(SuccessResponse) },
                {
                    properties: {
                        status: { type: "number", example: 200 },
                        message: {
                            type: "string",
                            example: "createIdentificationType"
                        },
                        item: { $ref: getSchemaPath(IdentificationType) },
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
        description: "Identification Type Conflict Error",
        schema: {
            allOf: [
                { $ref: getSchemaPath(ConflictResponse) },
                {
                    properties: {
                        status: { type: "number", example: 409 },
                        message: {
                            type: "string",

                            example:
                                "Sent Identification Type name already exist"
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
    async createIdentificationType(
        @Body()
        createIdentificationTypeDto: IdentificationTypeCreateAPIRequestDto
    ): Promise<ApiResponseDto<IdentificationType, void>> {
        createIdentificationTypeDto =
            await IdentificationTypeCreateAPIRequestDto.FromPlain(
                createIdentificationTypeDto
            );
        return new SuccessResponse(
            "createIdentificationType",
            await this.createIdentificationTypeUseCase.execute(
                createIdentificationTypeDto
            )
        );
    }

    @Get()
    @ApiOperation({ summary: "Find All Identification Type" })
    @ApiResponse({
        status: 200,
        description: "Find All Identification Type",
        schema: {
            allOf: [
                { $ref: getSchemaPath(SuccessResponse) },
                {
                    properties: {
                        status: { type: "number", example: 200 },
                        message: {
                            type: "string",
                            example: "findAllIdentificationType"
                        },
                        item: {
                            type: "array",
                            items: {
                                $ref: getSchemaPath(IdentificationType)
                            }
                        },
                        errors: { nullable: true }
                    }
                }
            ]
        }
    })
    async findAllIdentificationType(): Promise<
        ApiResponseDto<IdentificationType[], void>
    > {
        return new SuccessResponse(
            "findAllIdentificationType",
            await this.findAllIdentificationTypeUseCase.execute()
        );
    }

    @Get(":id")
    @ApiOperation({ summary: "Find By Id Identification Type" })
    @ApiParam({ name: "id", type: "number" })
    @ApiResponse({
        status: 200,
        description: "Find By Id Identification Type",
        schema: {
            allOf: [
                { $ref: getSchemaPath(SuccessResponse) },
                {
                    properties: {
                        status: { type: "number", example: 200 },
                        message: {
                            type: "string",
                            example: "findByIdIdentificationType"
                        },
                        item: { $ref: getSchemaPath(IdentificationType) },
                        errors: { nullable: true }
                    }
                }
            ]
        }
    })
    async findByIdIdentificationType(
        @Param("id") id: number
    ): Promise<ApiResponseDto<IdentificationType, void>> {
        return new SuccessResponse(
            "findByIdIdentificationType",
            await this.findByIdIdentificationTypeUseCase.execute(id)
        );
    }

    @Get("name/:name")
    @ApiOperation({ summary: "Find By Name Identification Type" })
    @ApiParam({ name: "name", type: "string" })
    @ApiResponse({
        status: 200,
        description: "Find By Name Identification Type",
        schema: {
            allOf: [
                { $ref: getSchemaPath(SuccessResponse) },
                {
                    properties: {
                        status: { type: "number", example: 200 },
                        message: {
                            type: "string",
                            example: "findByNameIdentificationType"
                        },
                        item: { $ref: getSchemaPath(IdentificationType) },
                        errors: { nullable: true }
                    }
                }
            ]
        }
    })
    async findByNameIdentificationType(
        @Param("name") name: string
    ): Promise<ApiResponseDto<IdentificationType, void>> {
        return new SuccessResponse(
            "findByNameIdentificationType",
            await this.findByNameIdentificationTypeUseCase.execute(name)
        );
    }

    @Put(":id")
    @ApiOperation({ summary: "Update Identification Type" })
    @ApiParam({ name: "id", type: "number" })
    @ApiResponse({
        status: 200,
        description: "Update Identification Type",
        schema: {
            allOf: [
                { $ref: getSchemaPath(SuccessResponse) },
                {
                    properties: {
                        status: { type: "number", example: 200 },
                        message: {
                            type: "string",
                            example: "updateIdentificationType"
                        },
                        item: { $ref: getSchemaPath(IdentificationType) },
                        errors: { nullable: true }
                    }
                }
            ]
        }
    })
    async updateIdentificationType(
        @Param("id") id: number,
        @Body()
        updateIdentificationTypeDto: IdentificationTypeUpdateAPIRequestDto
    ): Promise<ApiResponseDto<IdentificationType, void>> {
        updateIdentificationTypeDto =
            await IdentificationTypeUpdateAPIRequestDto.FromPlain(
                updateIdentificationTypeDto
            );
        return new SuccessResponse(
            "updateIdentificationType",
            await this.updateIdentificationTypeUseCase.execute({
                id,
                dto: updateIdentificationTypeDto
            })
        );
    }

    @Delete(":id")
    @ApiOperation({ summary: "Remove Identification Type" })
    @ApiParam({ name: "id", type: "number" })
    @ApiResponse({
        status: 200,
        description: "Remove Identification Type",
        schema: {
            allOf: [
                { $ref: getSchemaPath(SuccessResponse) },
                {
                    properties: {
                        status: { type: "number", example: 200 },
                        message: {
                            type: "string",
                            example: "removeIdentificationType"
                        },
                        item: { nullable: true },
                        errors: { nullable: true }
                    }
                }
            ]
        }
    })
    async removeIdentificationType(
        @Param("id") id: number
    ): Promise<ApiResponseDto<void, void>> {
        return new SuccessResponse(
            "removeIdentificationType",
            await this.deleteIdentificationTypeUseCase.execute(id)
        );
    }
}
