/**
 * DTO para la creación de una recarga (Top-Up)
 */
export class TopUpCreateDatabaseDto {
    /**
     * UUID de la billetera a recargar
     * @example "a1b2c3d4-e5f6-7890-abcd-1234567890ef"
     */
    wallet_uuid: string;

    /**
     * Monto a recargar
     * @example 50000
     */
    amount: number;

    /**
     * ID numérico interno de la billetera (opcional)
     * @example 42
     */
    wallet_id?: number;

    /**
     * UUID del usuario asociado a la recarga (opcional)
     * @example "f1e2d3c4-b5a6-7890-cdef-0987654321ab"
     */
    user_uuid?: string;
}
