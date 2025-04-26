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
    async findAllTopUp(): Promise<ApiResponseDto<TopUp[], void>> {
        return new SuccessResponse(
            "findAllTopUp",
            await this.findAllTopUpUseCase.execute()
        );
    }

    @Get(":id")
    async findByIdTopUp(
        @Param("id") id: number
    ): Promise<ApiResponseDto<TopUp, void>> {
        return new SuccessResponse(
            "findByIdTopUp",
            await this.findByIdTopUpUseCase.execute(id)
        );
    }

    @Get("wallet_id/:wallet_id")
    async findByWalletIdTopUp(
        @Param("wallet_id") wallet_id: number
    ): Promise<ApiResponseDto<TopUp[], void>> {
        return new SuccessResponse(
            "findByWalletIdTopUp",
            await this.findByWalletIdTopUpUseCase.execute(wallet_id)
        );
    }
}
