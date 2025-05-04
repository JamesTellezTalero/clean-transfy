/**
 * DTO la creacion de bancos
 */
export class BankCreateDatabaseDto {
    /**
     * nombre del banco
     * @example "Davivienda"
     */
    name: string;

    /**
     * codigo del banco
     * @example "566"
     */
    code: string;
}
