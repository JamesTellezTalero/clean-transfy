/**
 * DTO para la creación de una transferencia
 */
export class TransferCreateDatabaseDto {
    /**
     * UUID del usuario que realiza la transferencia
     * @example "b2c3d4e5-f6a7-8901-bcde-1234567890ff"
     */
    user_uuid: string;

    /**
     * ID interno de la billetera de origen (opcional)
     * @example 12
     */
    source_wallet_id?: number;

    /**
     * UUID de la billetera de origen
     * @example "abc12345-6789-def0-1234-567890abcdef"
     */
    source_wallet_uuid: string;

    /**
     * ID interno de la billetera de destino (opcional)
     * @example 34
     */
    target_wallet_id?: number;

    /**
     * UUID de la billetera de destino
     * @example "def67890-1234-5678-9abc-def012345678"
     */
    target_wallet_uuid: string;

    /**
     * Monto a transferir
     * @example 15000
     */
    amount: number;
}
