import { User } from "../../domain/entities/user.entity";

export class UserLoginApiResponseDto {
    token: string;
    user: User;
}
