import { Inject, Injectable } from "@nestjs/common";
import { IUseCase } from "src/shared/domain/use-cases/use-case.interface";
import { IBankRepository } from "../../domain/repositories/bank.respository.interface";
import { BankUpdateDatabaseDto } from "../dtos/bank.update-database.dto";
import { Bank } from "../../domain/entities/bank.entity";
import { NotFoundResponse } from "src/shared/application/dtos/api-responses/errors/not-found-error-response.dto";

/**
 * caso de uso destinado a la actualizacion de bancos
 *
 * Responsable de la actualizacion de bancos
 * asi como su validacion de preeexistencia para la propiedad id
 * Implementa el contrato IUseCase
 */
@Injectable()
export class updateBankUseCase
    implements IUseCase<{ id: number; dto: BankUpdateDatabaseDto }, Bank>
{
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
     * Ejecuta la logica de negocio: actualizacion de bancos y validacion de preexistencia.
     *
     * @param {{
     *      id: number,
     *      dto: BankUpdateDatabaseDto
     * }}
     * id - Id necesario para la actualizacion de bancos.
     * dto - body necesario para la actualizacion de bancos.
     *
     * @returns {Bank} Modelo primitivo de entidad Bank
     * @throw {NotFoundResponse} En caso de no existir el banco
     */
    async execute(updateBody: {
        id: number;
        dto: BankUpdateDatabaseDto;
    }): Promise<Bank> {
        const preExistBank = await this.bankRepository.findById(updateBody.id);
        if (!preExistBank)
            throw new NotFoundResponse("Sent Bank doesn't exist");
        else return this.bankRepository.update(updateBody.id, updateBody.dto);
    }
}
