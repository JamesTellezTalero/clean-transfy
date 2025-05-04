import { Inject, Injectable } from "@nestjs/common";
import { IUseCase } from "src/shared/domain/use-cases/use-case.interface";
import { IBankRepository } from "../../domain/repositories/bank.respository.interface";
import { BankCreateDatabaseDto } from "../dtos/bank.create-database.dto";
import { Bank } from "../../domain/entities/bank.entity";
import { ConflictResponse } from "src/shared/application/dtos/api-responses/errors/conflict-error-response.dto";

/**
 * caso de uso destinado a la creacion de bancos
 *
 * Responsable de la creacion de bancos
 * asi como su validacion de preexistencia para las propiedades name y code
 * Implementa el contrato IUseCase
 */
@Injectable()
export class createBankUseCase
    implements IUseCase<BankCreateDatabaseDto, Bank>
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
     * Ejecuta la logica de negocio: creacion de bancos y validacion de pre existencias.
     *
     * @param { BankCreateDatabaseDto} createDto - Contenido necesario para la creacion de bancos.
     * @returns {Bank} Modelo primitivo de entidad Bank
     * @throw {ConflictResponse} En caso de preexistencias por namo o code
     */
    async execute(createDto: BankCreateDatabaseDto): Promise<Bank> {
        const preExistBankName = await this.bankRepository.findByName(
            createDto.name
        );
        const preExistBankCode = await this.bankRepository.findByCode(
            createDto.code
        );
        if (preExistBankName)
            throw new ConflictResponse("Sent Bank name already exist");
        else if (preExistBankCode)
            throw new ConflictResponse("Sent Bank code already exist");
        else return this.bankRepository.create(createDto);
    }
}
