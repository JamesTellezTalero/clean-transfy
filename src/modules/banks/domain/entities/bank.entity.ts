import { ApiProperty } from "@nestjs/swagger";

export class Bank {
    @ApiProperty({ description: "Bank id" })
    id: number;
    @ApiProperty({ description: "Bank name" })
    name: string;
    @ApiProperty({ description: "Bank code" })
    code: string;
    @ApiProperty({ description: "Bank status" })
    status: boolean;
    @ApiProperty({ description: "Bank create date" })
    created_at: Date;
    @ApiProperty({ description: "Bank update date" })
    updated_at: Date;
}
