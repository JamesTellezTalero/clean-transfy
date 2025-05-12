import { Inject, Injectable } from "@nestjs/common";
import { IUseCase } from "src/shared/domain/use-cases/use-case.interface";
import { IBankRepository } from "../../domain/repositories/bank.respository.interface";
import { Bank } from "../../domain/entities/bank.entity";

/**
 * Caso de uso destinado a la obtención de un banco por su ID.
 *
 * Responsable de:
 * - Recuperar una entidad Bank utilizando su identificador numérico.
 *
 * Implementa el contrato `IUseCase`.
 */
@Injectable()
export class FindBankByIdUseCase implements IUseCase<number, Bank> {
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
     * Ejecuta la lógica de negocio: obtención de un banco a partir de su ID.
     *
     * @param id Identificador único del banco.
     * @returns La entidad Bank correspondiente al ID proporcionado.
     */
    async execute(id: number): Promise<Bank> {
        return this.bankRepository.findById(id);
    }
}
