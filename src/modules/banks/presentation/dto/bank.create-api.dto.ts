import { Expose } from "class-transformer";
import { IsString, Length } from "class-validator";
import { BaseDto } from "src/shared/application/dtos/base/base.dto";

export class BankCreateAPIRequestDto extends BaseDto<BankCreateAPIRequestDto> {
    @IsString()
    @Expose()
    name: string;
    @IsString()
    @Length(6, 6)
    @Expose()
    code: string;
}
