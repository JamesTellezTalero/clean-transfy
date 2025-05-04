import { ApiProperty } from "@nestjs/swagger";
import { Expose } from "class-transformer";
import { IsString, Length } from "class-validator";
import { BaseDto } from "src/shared/application/dtos/base/base.dto";

/**
 * DTO utilizado para recibir datos desde la API al momento de crear un banco.
 *
 * Extiende `BaseDto` para la inicialización, sanitizacion y validacion automática de propiedades.
 */
export class BankCreateAPIRequestDto extends BaseDto<BankCreateAPIRequestDto> {
    /**
     * nombre del banco
     * @example "Davivienda"
     */
    @ApiProperty({ description: "Bank Name" })
    @IsString()
    @Expose()
    name: string;

    /**
     * codigo del banco
     * @example "566"
     */
    @ApiProperty({ description: "Bank Code" })
    @IsString()
    @Length(6, 6)
    @Expose()
    code: string;
}
