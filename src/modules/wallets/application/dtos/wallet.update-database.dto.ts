/**
 * DTO para la actualización de una billetera
 */
export class WalletUpdateDatabaseDto {
    /**
     * ID del usuario asociado a la billetera
     * @example 123
     */
    user_id: number;

    /**
     * ID del banco asociado a la billetera
     * @example 1
     */
    bank_id: number;
}
