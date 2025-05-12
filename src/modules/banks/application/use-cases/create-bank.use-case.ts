import { Inject, Injectable } from "@nestjs/common";
import { IUseCase } from "src/shared/domain/use-cases/use-case.interface";
import { IBankRepository } from "../../domain/repositories/bank.respository.interface";
import { BankCreateDatabaseDto } from "../dtos/bank.create-database.dto";
import { Bank } from "../../domain/entities/bank.entity";
import { ConflictResponse } from "src/shared/application/dtos/api-responses/errors/conflict-error-response.dto";

/**
 * Caso de uso destinado a la creación de bancos.
 *
 * Responsable de:
 * - Validar preexistencia de nombre y código.
 * - Crear un nuevo banco si no hay conflictos.
 *
 * Implementa el contrato `IUseCase`.
 */
@Injectable()
export class CreateBankUseCase
    implements IUseCase<BankCreateDatabaseDto, Bank>
{
    /**
     * Inicializa una instancia del caso de uso con el repositorio inyectado.
     *
     * @param bankRepository Repositorio encargado del acceso a datos para entidades Bank.
     */
    constructor(
        @Inject("IBankRepository")
        private bankRepository: IBankRepository
    ) {}

    /**
     * Ejecuta la lógica de negocio para la creación de un banco.
     *
     * @param createDto Datos necesarios para la creación del banco.
     * @returns Entidad `Bank` creada.
     * @throws {ConflictResponse} Si el nombre o código del banco ya existen.
     */
    async execute(createDto: BankCreateDatabaseDto): Promise<Bank> {
        const preExistBankName = await this.bankRepository.findByName(
            createDto.name
        );
        const preExistBankCode = await this.bankRepository.findByCode(
            createDto.code
        );

        if (preExistBankName)
            throw new ConflictResponse("Sent Bank name already exists");
        if (preExistBankCode)
            throw new ConflictResponse("Sent Bank code already exists");

        return this.bankRepository.create(createDto);
    }
}
