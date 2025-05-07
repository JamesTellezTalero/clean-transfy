/**
 * DTO para la creación de una nueva billetera
 */
export class WalletCreateDatabaseDto {
    /**
     * ID del usuario (opcional)
     * @example 123
     */
    user_id?: number;

    /**
     * UUID del usuario asociado a la billetera
     * @example "f6f5d8c0-4d75-4a3b-8c0c-4fe3bdfe1e4f"
     */
    user_uuid: string;

    /**
     * ID del banco asociado a la billetera
     * @example 1
     */
    bank_id: number;
}
