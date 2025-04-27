import { ApiProperty } from "@nestjs/swagger";

export class Bank {
    @ApiProperty({ description: "id", type: "number" })
    id: number;
    @ApiProperty({ description: "name", type: "string" })
    name: string;
    @ApiProperty({ description: "code", type: "string" })
    code: string;
    @ApiProperty({ description: "status", type: "boolean" })
    status: boolean;
    @ApiProperty({ description: "create date", type: "string" })
    created_at: Date;
    @ApiProperty({ description: "update date", type: "string" })
    updated_at: Date;
}
