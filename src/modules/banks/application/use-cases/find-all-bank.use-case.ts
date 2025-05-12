import { Inject, Injectable } from "@nestjs/common";
import { IUseCase } from "src/shared/domain/use-cases/use-case.interface";
import { IBankRepository } from "../../domain/repositories/bank.respository.interface";
import { Bank } from "../../domain/entities/bank.entity";

/**
 * Caso de uso destinado a la obtención de todos los bancos.
 *
 * Responsable de:
 * - Recuperar todas las entidades Bank registradas en el sistema.
 *
 * Implementa el contrato `IUseCase`.
 */
@Injectable()
export class FindAllBanksUseCase implements IUseCase<null, Bank[]> {
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
     * Ejecuta la lógica de negocio: recuperación de todos los bancos registrados.
     *
     * @returns Lista de entidades Bank.
     */
    async execute(): Promise<Bank[]> {
        return this.bankRepository.findAll();
    }
}
