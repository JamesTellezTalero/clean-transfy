import { ApiProperty } from "@nestjs/swagger";
import { User } from "../../domain/entities/user.entity";
import { BaseDto } from "src/shared/application/dtos/base/base.dto";

export class UserLoginApiResponseDto extends BaseDto<UserLoginApiResponseDto> {
    @ApiProperty({ name: "token", type: "string" })
    token: string;
    @ApiProperty({ name: "user", type: User })
    user: User;
}
