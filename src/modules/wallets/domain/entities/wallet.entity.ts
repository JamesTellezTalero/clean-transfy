import { ApiProperty } from "@nestjs/swagger";

export class Wallet {
    @ApiProperty({ name: "id", type: "number" })
    id: number;
    @ApiProperty({ name: "uuid", type: "string" })
    uuid: string;
    @ApiProperty({ name: "user_id", type: "number" })
    user_id: number;
    @ApiProperty({ name: "bank_id", type: "number" })
    bank_id: number;
    @ApiProperty({ name: "balance", type: "number" })
    balance: number;
    @ApiProperty({ name: "status", type: "boolean" })
    status: boolean;
    @ApiProperty({ name: "created_at", type: "string" })
    created_at: Date;
    @ApiProperty({ name: "updated_at", type: "string" })
    updated_at: Date;
}
