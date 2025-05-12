import { Inject, Injectable } from "@nestjs/common";
import { IUseCase } from "src/shared/domain/use-cases/use-case.interface";
import { ITopUpRepository } from "../../domain/repositories/top_up.respository.interface";
import { TopUp } from "../../domain/entities/top_up.entity";

/**
 * Caso de uso destinado a obtener una recarga (top-up) por su ID.
 *
 * Responsable de la consulta de una recarga en el repositorio usando el identificador único (ID).
 * Implementa el contrato IUseCase.
 */
@Injectable()
export class findByIdTopUpUseCase implements IUseCase<number, TopUp> {
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
     * Ejecuta la lógica de negocio para obtener una recarga por su ID.
     *
     * @param {number} id - El ID de la recarga que se va a consultar.
     * @returns {Promise<TopUp>} - La recarga correspondiente al ID proporcionado.
     */
    async execute(id: number): Promise<TopUp> {
        return this.topUpRepository.findById(id);
    }
}
