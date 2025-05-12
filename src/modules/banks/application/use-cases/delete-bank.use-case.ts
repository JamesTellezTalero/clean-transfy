import { Inject, Injectable } from "@nestjs/common";
import { IUseCase } from "src/shared/domain/use-cases/use-case.interface";
import { IBankRepository } from "../../domain/repositories/bank.respository.interface";
import { NotFoundResponse } from "src/shared/application/dtos/api-responses/errors/not-found-error-response.dto";

/**
 * Caso de uso destinado a la eliminación de bancos.
 *
 * Responsable de:
 * - Validar la existencia del banco por su ID.
 * - Eliminar el banco si existe.
 *
 * Implementa el contrato `IUseCase`.
 */
@Injectable()
export class DeleteBankUseCase implements IUseCase<number, void> {
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
     * Ejecuta la lógica de negocio para eliminar un banco.
     *
     * @param id ID del banco a eliminar.
     * @returns void
     * @throws {NotFoundResponse} Si el banco no existe.
     */
    async execute(id: number): Promise<void> {
        const preExistBank = await this.bankRepository.findById(id);
        if (!preExistBank)
            throw new NotFoundResponse("Sent bank doesn't exist");

        await this.bankRepository.delete(id);
    }
}
