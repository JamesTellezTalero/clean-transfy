import { Expose } from "class-transformer";
import { IsString, Length } from "class-validator";
import { BaseDto } from "src/shared/application/dtos/base/base.dto";

export class IdentificationTypeCreateAPIRequestDto extends BaseDto<IdentificationTypeCreateAPIRequestDto> {
    @IsString()
    @Expose()
    name: string;
    @IsString()
    @Length(5, 5)
    @Expose()
    code: string;
}
