import { ApiProperty } from "@nestjs/swagger";
import { User } from "../../domain/entities/user.entity";

export class UserLoginApiResponseDto {
    @ApiProperty({ name: "token", type: "string" })
    token: string;
    @ApiProperty({ name: "user", type: User })
    user: User;
}
