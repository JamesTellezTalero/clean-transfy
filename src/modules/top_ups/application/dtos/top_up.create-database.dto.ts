export class TopUpCreateDatabaseDto {
    wallet_uuid: string;
    amount: number;
    wallet_id?: number;
    user_uuid?: string;
}
