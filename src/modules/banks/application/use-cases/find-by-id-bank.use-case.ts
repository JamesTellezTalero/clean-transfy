import { Inject, Injectable } from "@nestjs/common";
import { IUseCase } from "src/shared/domain/use-cases/use-case.interface";
import { IBankRepository } from "../../domain/repositories/bank.respository.interface";
import { Bank } from "../../domain/entities/bank.entity";

/**
 * caso de uso destinado a la obtencion de bancos por id
 *
 * Responsable de la obtencion por id de bancos
 * Implementa el contrato IUseCase
 */
@Injectable()
export class findByIdBankUseCase implements IUseCase<number, Bank> {
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
     * Ejecuta la logica de negocio: obtencion de bancos por id.
     *
     * @param {number} id id de banco
     * @returns {Bank}
     */
    async execute(id: number): Promise<Bank> {
        return this.bankRepository.findById(id);
    }
}
