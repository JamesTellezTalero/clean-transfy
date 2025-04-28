import { ApiProperty } from "@nestjs/swagger";

export class User {
    @ApiProperty({ name: "id", type: "number" })
    id: number;
    @ApiProperty({ name: "username", type: "string" })
    username: string;
    password: string;
    @ApiProperty({ name: "uuid", type: "string" })
    uuid: string;
    @ApiProperty({ name: "id", type: "number" })
    status: boolean;
    @ApiProperty({ name: "first_name", type: "string" })
    first_name: string;
    @ApiProperty({ name: "middle_name", type: "string" })
    middle_name: string;
    @ApiProperty({ name: "last_name", type: "string" })
    last_name: string;
    @ApiProperty({ name: "second_last_name", type: "string" })
    second_last_name: string;
    @ApiProperty({ name: "identification_number", type: "string" })
    identification_number: string;
    @ApiProperty({ name: "identification_type_id", type: "number" })
    identification_type_id: number;
    @ApiProperty({ name: "email", type: "string" })
    email: string;
    @ApiProperty({ name: "phone", type: "string" })
    phone: string;
    @ApiProperty({ name: "address", type: "string" })
    address: string;
    @ApiProperty({ name: "created_at", type: "number" })
    created_at: Date;
    @ApiProperty({ name: "updated_at", type: "number" })
    updated_at: Date;
}
