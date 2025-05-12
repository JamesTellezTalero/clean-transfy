import { Inject, Injectable } from "@nestjs/common";
import { IUseCase } from "src/shared/domain/use-cases/use-case.interface";
import { IBankRepository } from "../../domain/repositories/bank.respository.interface";
import { Bank } from "../../domain/entities/bank.entity";

/**
 * Caso de uso destinado a la obtención de un banco por su código.
 *
 * Responsable de:
 * - Recuperar una entidad Bank utilizando su código único.
 *
 * Implementa el contrato `IUseCase`.
 */
@Injectable()
export class FindBankByCodeUseCase implements IUseCase<string, Bank> {
    /**
     * Inicializa una instancia del caso de uso con el repositorio de bancos inyectado.
     *
     * @param bankRepository Repositorio encargado del acceso a datos para entidades Bank.
     */
    constructor(
        @Inject("IBankRepository")
        private bankRepository: IBankRepository
    ) {}

    /**
     * Ejecuta la lógica de negocio: obtención de un banco a partir de su código.
     *
     * @param code Código único del banco.
     * @returns La entidad Bank correspondiente al código proporcionado.
     */
    async execute(code: string): Promise<Bank> {
        return this.bankRepository.findByCode(code);
    }
}
