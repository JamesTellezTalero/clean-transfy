import { ApiProperty } from "@nestjs/swagger";

export class IdentificationType {
    @ApiProperty({ description: "id", type: "number" })
    id: number;
    @ApiProperty({ description: "name", type: "string" })
    name: string;
    @ApiProperty({ description: "created_at", type: "string" })
    created_at: Date;
    @ApiProperty({ description: "updated_at", type: "string" })
    updated_at: Date;
}
