import { BaseDto } from "src/shared/application/dtos/base/base.dto";
import { IsString } from "class-validator";
import { Expose } from "class-transformer";

export class BankUpdateAPIRequestDto extends BaseDto<BankUpdateAPIRequestDto> {
    @IsString()
    @Expose()
    name: string;
    @IsString()
    @Expose()
    code: string;
}
