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
    async findAllIdentificationType(): Promise<
        ApiResponseDto<IdentificationType[], void>
    > {
        return new SuccessResponse(
            "findAllIdentificationType",
            await this.findAllIdentificationTypeUseCase.execute()
        );
    }

    @Get(":id")
    async findByIdIdentificationType(
        @Param("id") id: number
    ): Promise<ApiResponseDto<IdentificationType, void>> {
        return new SuccessResponse(
            "findByIdIdentificationType",
            await this.findByIdIdentificationTypeUseCase.execute(id)
        );
    }

    @Get("name/:name")
    async findByNameIdentificationType(
        @Param("name") name: string
    ): Promise<ApiResponseDto<IdentificationType, void>> {
        return new SuccessResponse(
            "findByNameIdentificationType",
            await this.findByNameIdentificationTypeUseCase.execute(name)
        );
    }

    @Put(":id")
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
    async removeIdentificationType(
        @Param("id") id: number
    ): Promise<ApiResponseDto<void, void>> {
        return new SuccessResponse(
            "removeIdentificationType",
            await this.deleteIdentificationTypeUseCase.execute(id)
        );
    }
}
