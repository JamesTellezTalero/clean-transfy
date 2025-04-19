import { BaseDto } from "src/shared/application/dtos/base/base.dto";
import { IsString, Length } from "class-validator";
import { Expose } from "class-transformer";

export class IdentificationTypeUpdateAPIRequestDto extends BaseDto<IdentificationTypeUpdateAPIRequestDto> {
    @IsString()
    @Expose()
    name: string;
    @IsString()
    @Length(5, 5)
    @Expose()
    code: string;
}
