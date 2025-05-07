import { ApiProperty } from "@nestjs/swagger";
import { Expose } from "class-transformer";
import { IsString, Length } from "class-validator";
import { BaseDto } from "src/shared/application/dtos/base/base.dto";

/**
 * DTO utilizado para recibir datos desde la API al momento de crear un tipo de identificación.
 *
 * Extiende `BaseDto` para la inicialización, sanitización y validación automática de propiedades.
 */
export class IdentificationTypeCreateAPIRequestDto extends BaseDto<IdentificationTypeCreateAPIRequestDto> {
    /**
     * Nombre del tipo de identificación
     * @example "Cédula de Ciudadanía"
     */
    @ApiProperty({ description: "Type of Identification Name", type: "string" })
    @IsString()
    @Expose()
    name: string;

    /**
     * Código del tipo de identificación (Ejemplo: CC)
     * Debe ser maximo de 5 caracteres.
     * @example "CC"
     */
    @ApiProperty({ description: "Identification Type Code", type: "string" })
    @IsString()
    @Length(5, 5)
    @Expose()
    code: string;
}
