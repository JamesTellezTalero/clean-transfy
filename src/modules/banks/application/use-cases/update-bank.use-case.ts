import { Inject, Injectable } from "@nestjs/common";
import { IUseCase } from "src/shared/domain/use-cases/use-case.interface";
import { IBankRepository } from "../../domain/repositories/bank.respository.interface";
import { BankUpdateDatabaseDto } from "../dtos/bank.update-database.dto";
import { Bank } from "../../domain/entities/bank.entity";
import { NotFoundResponse } from "src/shared/application/dtos/api-responses/errors/not-found-error-response.dto";

/**
 * Caso de uso destinado a la actualización de bancos.
 *
 * Responsable de:
 * - Validar la existencia del banco por ID.
 * - Actualizar los datos del banco.
 *
 * Implementa el contrato `IUseCase`.
 */
@Injectable()
export class UpdateBankUseCase
    implements IUseCase<{ id: number; dto: BankUpdateDatabaseDto }, Bank>
{
    /**
     * Inicializa una instancia del caso de uso con el repositorio de bancos inyectado.
     *
     * @param bankRepository Repositorio encargado del acceso a datos para entidades Bank.
     */
    constructor(
        @Inject("IBankRepository")
        private readonly bankRepository: IBankRepository
    ) {}

    /**
     * Ejecuta la lógica de negocio para actualizar un banco, previa validación de existencia.
     *
     * @param updateBody Objeto que contiene:
     * - `id`: ID del banco a actualizar.
     * - `dto`: Datos a actualizar.
     *
     * @returns La entidad Bank actualizada.
     * @throws {NotFoundResponse} Si el banco con el ID proporcionado no existe.
     */
    async execute(updateBody: {
        id: number;
        dto: BankUpdateDatabaseDto;
    }): Promise<Bank> {
        const existingBank = await this.bankRepository.findById(updateBody.id);

        if (!existingBank)
            throw new NotFoundResponse("The specified bank does not exist.");

        return this.bankRepository.update(updateBody.id, updateBody.dto);
    }
}
