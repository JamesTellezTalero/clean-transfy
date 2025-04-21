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
import { createWalletUseCase } from "../../application/use-cases/create-wallet.use-case";
import { deleteWalletUseCase } from "../../application/use-cases/delete-wallet.use-case";
import { updateWalletUseCase } from "../../application/use-cases/update-wallet.use-case";
import { findByAllWalletUseCase } from "../../application/use-cases/find-by-all-wallet.use-case";
import { findByIdWalletUseCase } from "../../application/use-cases/find-by-id-wallet.use-case";
import { findByUuidWalletUseCase } from "../../application/use-cases/find-by-uuid-wallet.use-case";
import { findByUserIdWalletUseCase } from "../../application/use-cases/find-by-user-id-wallet.use-case";
import { findByBankIdWalletUseCase } from "../../application/use-cases/find-by-bank-id-wallet.use-case";
import { WalletUpdateAPIRequestDto } from "../dtos/wallet.update-api.dto";
import { WalletCreateAPIRequestDto } from "../dtos/wallet.create-api.dto";

@Controller("wallet")
export class WalletController {
    constructor(
        private readonly createWalletUseCase: createWalletUseCase,
        private readonly deleteWalletUseCase: deleteWalletUseCase,
        private readonly updateWalletUseCase: updateWalletUseCase,
        private readonly findAllWalletUseCase: findByAllWalletUseCase,
        private readonly findByIdWalletUseCase: findByIdWalletUseCase,
        private readonly findByUuidWalletUseCase: findByUuidWalletUseCase,
        private readonly findByUserIdWalletUseCase: findByUserIdWalletUseCase,
        private readonly findByBankIdWalletUseCase: findByBankIdWalletUseCase
    ) {}

    @Post()
    async createWallet(
        @Body()
        createWalletDto: WalletCreateAPIRequestDto
    ): Promise<ApiResponseDto> {
        createWalletDto =
            await WalletCreateAPIRequestDto.FromPlain(createWalletDto);
        return new SuccessResponse(
            "createWallet",
            await this.createWalletUseCase.execute(createWalletDto)
        );
    }

    @Get()
    async findAllWallet(): Promise<ApiResponseDto> {
        return new SuccessResponse(
            "findAllWallet",
            await this.findAllWalletUseCase.execute()
        );
    }

    @Get(":id")
    async findByIdWallet(@Param("id") id: number): Promise<ApiResponseDto> {
        return new SuccessResponse(
            "findByIdWallet",
            await this.findByIdWalletUseCase.execute(id)
        );
    }

    @Get("uuid/:uuid")
    async findByUuidWallet(
        @Param("uuid") uuid: string
    ): Promise<ApiResponseDto> {
        return new SuccessResponse(
            "findByUuidWallet",
            await this.findByUuidWalletUseCase.execute(uuid)
        );
    }

    @Get("user_id/:user_id")
    async findByUserIdWallet(
        @Param("user_id") user_id: number
    ): Promise<ApiResponseDto> {
        return new SuccessResponse(
            "findByUserIdWallet",
            await this.findByUserIdWalletUseCase.execute(user_id)
        );
    }

    @Get("bank_id/:bank_id")
    async findByBankIdWallet(
        @Param("bank_id") bank_id: number
    ): Promise<ApiResponseDto> {
        return new SuccessResponse(
            "findByBankIdWallet",
            await this.findByBankIdWalletUseCase.execute(bank_id)
        );
    }

    @Delete(":id")
    async removeWallet(@Param("id") id: number): Promise<ApiResponseDto> {
        return new SuccessResponse(
            "removeWallet",
            await this.deleteWalletUseCase.execute(id)
        );
    }
}
