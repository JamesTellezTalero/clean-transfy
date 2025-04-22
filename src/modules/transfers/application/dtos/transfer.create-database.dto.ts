export class TransferCreateDatabaseDto {
    user_uuid: string;
    source_wallet_id?: number;
    source_wallet_uuid: string;
    target_wallet_id?: number;
    target_wallet_uuid: string;
    amount: number;
}
