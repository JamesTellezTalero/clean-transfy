import { Inject, Injectable } from "@nestjs/common";
import { IUseCase } from "src/shared/domain/use-cases/use-case.interface";
import { ITopUpRepository } from "../../domain/repositories/top_up.respository.interface";
import { TopUp } from "../../domain/entities/top_up.entity";

/**
 * Caso de uso destinado a obtener todas las recargas (top-ups) existentes.
 *
 * Responsable de la consulta de todas las recargas almacenadas en el repositorio.
 * Implementa el contrato IUseCase.
 */
@Injectable()
export class findAllTopUpUseCase implements IUseCase<null, TopUp[]> {
    /**
     * Crea una instancia del caso de uso con el repositorio de recargas inyectado.
     *
     * @param {ITopUpRepository} topUpRepository - Repositorio encargado de la gestión de las recargas (top-ups).
     */
    constructor(
        @Inject("ITopUpRepository")
        private topUpRepository: ITopUpRepository
    ) {}

    /**
     * Ejecuta la lógica de negocio para obtener todas las recargas (top-ups).
     *
     * @returns {Promise<TopUp[]>} - Una lista de todas las recargas almacenadas.
     */
    async execute(): Promise<TopUp[]> {
        return this.topUpRepository.findAll();
    }
}
