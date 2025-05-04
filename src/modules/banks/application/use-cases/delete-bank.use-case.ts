import { Inject, Injectable } from "@nestjs/common";
import { IUseCase } from "src/shared/domain/use-cases/use-case.interface";
import { IBankRepository } from "../../domain/repositories/bank.respository.interface";
import { NotFoundResponse } from "src/shared/application/dtos/api-responses/errors/not-found-error-response.dto";

/**
 * caso de uso destinado a la eliminacion de bancos
 *
 * Responsable de la eliminacion de bancos
 * asi como su validacion de existencia para la propiedad id
 * Implementa el contrato IUseCase
 */
@Injectable()
export class deleteBankUseCase implements IUseCase<number, void> {
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
     * Ejecuta la logica de negocio: creacion de bancos y validacion de pre existencias.
     *
     * @param { number} id - Id necesario para la eliminacion de bancos.
     * @returns {void}
     * @throw {NotFoundResponse} En caso de no existir el banco
     */
    async execute(id: number): Promise<void> {
        const preExistBank = await this.bankRepository.findById(id);
        if (!preExistBank)
            throw new NotFoundResponse("Sent Bank doesn't exist");
        else return this.bankRepository.delete(id);
    }
}
