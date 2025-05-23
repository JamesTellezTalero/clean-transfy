import { Inject, Injectable } from "@nestjs/common";
import { IUseCase } from "src/shared/domain/use-cases/use-case.interface";
import { IBankRepository } from "../../domain/repositories/bank.respository.interface";
import { Bank } from "../../domain/entities/bank.entity";

/**
 * Caso de uso destinado a la obtención de un banco por su nombre.
 *
 * Responsable de:
 * - Recuperar una entidad Bank utilizando su nombre único.
 *
 * Implementa el contrato `IUseCase`.
 */
@Injectable()
export class FindBankByNameUseCase implements IUseCase<string, Bank> {
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
     * Ejecuta la lógica de negocio: obtención de un banco a partir de su nombre.
     *
     * @param name Nombre único del banco.
     * @returns La entidad Bank correspondiente al nombre proporcionado.
     */
    async execute(name: string): Promise<Bank> {
        return this.bankRepository.findByName(name);
    }
}
