import { Inject, Injectable } from "@nestjs/common";
import { IUseCase } from "src/shared/domain/use-cases/use-case.interface";
import { IBankRepository } from "../../domain/repositories/bank.respository.interface";
import { BankUpdateDatabaseDto } from "../dtos/bank.update-database.dto";
import { Bank } from "../../domain/entities/bank.entity";
import { NotFoundResponse } from "src/shared/application/dtos/api-responses/errors/not-found-error-response.dto";

/**
 * caso de uso destinado a la obtencion general de bancos
 *
 * Responsable de la obtencion general de bancos
 * Implementa el contrato IUseCase
 */
@Injectable()
export class findByAllBankUseCase implements IUseCase<null, Bank[]> {
    /**
     * Crea una instancia del caso de uso con el repositorio de bancos inyectado.
     *
     * @param {IBankRepository} bankRepository - Repositorio encargado de procesos del lectura y escritura para la interface Banks.
     */
    constructor(
        @Inject("IBankRepository")
        private bankRepository: IBankRepository
    ) {}

    /**
     * Ejecuta la logica de negocio: obtencion general.
     *
     * @returns {Array<Bank>}
     */
    async execute(): Promise<Bank[]> {
        return this.bankRepository.findAll();
    }
}
