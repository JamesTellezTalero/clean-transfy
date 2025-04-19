import { Expose } from "class-transformer";
import { IsString } from "class-validator";
import { BaseDto } from "src/shared/application/dtos/base/base.dto";

export class BankCreateAPIRequestDto extends BaseDto<BankCreateAPIRequestDto> {
    @IsString()
    @Expose()
    name: string;
    @IsString()
    @Expose()
    code: string;
}
