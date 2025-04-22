import { Body, Controller, Get, Param, Post, UseGuards } from "@nestjs/common";
import { ApiResponseDto } from "src/shared/application/dtos/api-responses/api-response.dto";
import { SuccessResponse } from "src/shared/application/dtos/api-responses/success-response.dto";
import { TransferCreateAPIRequestDto } from "../dtos/transfer.create-api.dto";
import { createTransferUseCase } from "../../application/use-cases/create-transfer.use-case";
import { findByAllTransferUseCase } from "../../application/use-cases/find-by-all-transfer.use-case";
import { findByIdTransferUseCase } from "../../application/use-cases/find-by-id-transfer.use-case";
import { findBySourceWalletIdTransferUseCase } from "../../application/use-cases/find-by-source-wallet-id-transfer.use-case";
import { findByTargetWalletIdTransferUseCase } from "../../application/use-cases/find-by-target-wallet-id-transfer.use-case";
import { AuthGuard } from "src/modules/auth/infrastructure/guards/auth.guard";

@Controller("transfer")
export class TransferController {
    constructor(
        private readonly createTransferUseCase: createTransferUseCase,
        private readonly findAllTransferUseCase: findByAllTransferUseCase,
        private readonly findByIdTransferUseCase: findByIdTransferUseCase,
        private readonly findBySourceWalletIdTransferUseCase: findBySourceWalletIdTransferUseCase,
        private readonly findByTargetWalletIdTransferUseCase: findByTargetWalletIdTransferUseCase
    ) {}

    @UseGuards(AuthGuard)
    @Post("/")
    async createTransfer(
        @Body()
        createTransferDto: TransferCreateAPIRequestDto
    ): Promise<ApiResponseDto> {
        createTransferDto =
            await TransferCreateAPIRequestDto.FromPlain(createTransferDto);
        return new SuccessResponse(
            "createTransfer",
            await this.createTransferUseCase.execute(createTransferDto)
        );
    }

    @Get("/")
    async findAllTransfer(): Promise<ApiResponseDto> {
        return new SuccessResponse(
            "findAllTransfer",
            await this.findAllTransferUseCase.execute()
        );
    }

    @Get(":id")
    async findByIdTransfer(@Param("id") id: number): Promise<ApiResponseDto> {
        return new SuccessResponse(
            "findByIdTransfer",
            await this.findByIdTransferUseCase.execute(id)
        );
    }

    @Get("source_wallet_id/:source_wallet_id")
    async findBySourceWalletIdTransfer(
        @Param("source_wallet_id") source_wallet_id: number
    ): Promise<ApiResponseDto> {
        return new SuccessResponse(
            "findBySourceWalletIdTransfer",
            await this.findBySourceWalletIdTransferUseCase.execute(
                source_wallet_id
            )
        );
    }

    @Get("target_wallet_id/:target_wallet_id")
    async findByTargetWalletIdTransfer(
        @Param("target_wallet_id") target_wallet_id: number
    ): Promise<ApiResponseDto> {
        return new SuccessResponse(
            "findByTargetWalletIdTransfer",
            await this.findByTargetWalletIdTransferUseCase.execute(
                target_wallet_id
            )
        );
    }
}
