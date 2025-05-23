import { Inject, Injectable } from "@nestjs/common";
import { IUseCase } from "src/shared/domain/use-cases/use-case.interface";
import { ITopUpRepository } from "../../domain/repositories/top_up.respository.interface";
import { TopUp } from "../../domain/entities/top_up.entity";

/**
 * Caso de uso destinado a obtener todas las recargas (top-ups) asociadas a una billetera específica.
 *
 * Responsable de consultar las recargas realizadas para una billetera particular usando su ID.
 * Implementa el contrato IUseCase.
 */
@Injectable()
export class findByWalletIdTopUpUseCase implements IUseCase<number, TopUp[]> {
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
     * Ejecuta la lógica de negocio para obtener las recargas asociadas a una billetera por su ID.
     *
     * @param {number} wallet_id - El ID de la billetera cuya lista de recargas se va a consultar.
     * @returns {Promise<TopUp[]>} - Lista de recargas asociadas a la billetera especificada.
     */
    async execute(wallet_id: number): Promise<TopUp[]> {
        return this.topUpRepository.findByWalletId(wallet_id);
    }
}
