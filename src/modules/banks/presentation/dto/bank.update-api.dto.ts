import { BaseDto } from "src/shared/application/dtos/base/base.dto";
import { IsString, Length } from "class-validator";
import { Expose } from "class-transformer";
import { ApiProperty } from "@nestjs/swagger";

/**
 * DTO utilizado para actualizar un banco desde la API.
 *
 * Extiende `BaseDto` para la inicialización, sanitizacion y validacion automática de propiedades.
 */
export class BankUpdateAPIRequestDto extends BaseDto<BankUpdateAPIRequestDto> {
    /**
     * nombre del banco
     * @example "391"
     */
    @ApiProperty({ description: "Bank Name" })
    @IsString()
    @Expose()
    name: string;

    /**
     * nombre del banco
     * @example "391"
     */
    @ApiProperty({ description: "Bank Code" })
    @IsString()
    @Length(6, 6)
    @Expose()
    code: string;
}
