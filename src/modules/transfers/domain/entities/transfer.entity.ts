import { ApiProperty } from "@nestjs/swagger";

export class Transfer {
    @ApiProperty({ name: "id", type: "number" })
    id: number;
    @ApiProperty({ name: "source_wallet_id", type: "number" })
    source_wallet_id: number;
    @ApiProperty({ name: "target_wallet_id", type: "number" })
    target_wallet_id: number;
    @ApiProperty({ name: "amount", type: "number" })
    amount: number;
    @ApiProperty({ name: "created_at", type: "string" })
    created_at: Date;
    @ApiProperty({ name: "updated_at", type: "string" })
    updated_at: Date;
}
