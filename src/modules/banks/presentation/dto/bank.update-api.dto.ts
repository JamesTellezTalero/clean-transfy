import { BaseDto } from "src/shared/application/dtos/base/base.dto";
import { IsString, Length } from "class-validator";
import { Expose } from "class-transformer";

export class BankUpdateAPIRequestDto extends BaseDto<BankUpdateAPIRequestDto> {
    @IsString()
    @Expose()
    name: string;
    @IsString()
    @Length(6, 6)
    @Expose()
    code: string;
}
