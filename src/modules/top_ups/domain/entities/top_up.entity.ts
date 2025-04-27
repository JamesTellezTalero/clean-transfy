import { ApiProperty } from "@nestjs/swagger";

export class TopUp {
    @ApiProperty({ name: "id", type: "number" })
    id: number;
    @ApiProperty({ name: "wallet_id", type: "number" })
    wallet_id: number;
    @ApiProperty({ name: "amount", type: "number" })
    amount: number;
    @ApiProperty({ name: "created_at", type: "string" })
    created_at: Date;
    @ApiProperty({ name: "updated_at", type: "string" })
    updated_at: Date;
}
