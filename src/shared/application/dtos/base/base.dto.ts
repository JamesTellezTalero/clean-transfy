import {
    IsString,
    IsNotEmpty,
    ValidateNested,
    IsInt,
    IsOptional,
    validate,
    ValidationError
} from "class-validator";
import { Expose, Type, plainToInstance } from "class-transformer";
import * as sqlstring from "sqlstring"; // Librería para san
import { BadRequestResponse } from "../api-responses/errors/bad-request-error-response.dto";
import { mapperErrorsUtils } from "../../utils/mapper-errors.utils";

// Clase base genérica
export class BaseDto<T> {
    // Método para validar la clase
    async validate(): Promise<this> {
        this.sanitize(); // Llamar sanitización antes de validar
        const errors = await validate(this);
        if (errors.length > 0) {
            const errosMapped = mapperErrorsUtils(errors);
            throw new BadRequestResponse(
                "Campos Incompletos",
                null,
                errosMapped
            );
        }
        return this;
    }

    // Método para validar la clase
    async validateInMass(): Promise<ValidationError[] | this> {
        this.sanitize(); // Llamar sanitización antes de validar
        const errors = await validate(this);
        if (errors.length > 0) return errors;
        else return this;
    }

    // Método genérico para transformar un objeto plano en una instancia del DTO
    static async FromPlain<T>(this: new () => T, body: any): Promise<T> {
        const dto = plainToInstance(this, body || {}, {
            excludeExtraneousValues: true
        });

        await (dto as any).validate();
        return dto;
    }

    // Método genérico para transformar un objeto plano en una instancia del DTO
    static async FromPlainInMass<T>(
        this: new () => T,
        bodys: any[]
    ): Promise<T[]> {
        if (!Array.isArray(bodys) || bodys.length === 0)
            throw new BadRequestResponse(
                "Este endpoint debe recibir un arreglo",
                null
            );

        const bodysPromises = bodys.map(async (body) => {
            const dto = plainToInstance(this, body || {}, {
                excludeExtraneousValues: true
            });

            return await (dto as any).validateInMass();
        });

        const validatedBodys = await Promise.all(bodysPromises);

        const errors = validatedBodys
            .filter((v) => Array.isArray(v))
            .flatMap((v) => v);

        if (errors.length > 0)
            throw new BadRequestResponse("Campos Incompletos", null, errors);

        return validatedBodys;
    }

    // Método para sanitizar todos los valores de las propiedades de la clase
    private sanitize(): void {
        for (const key of Object.keys(this)) {
            const value = (this as any)[key];
            if (typeof value === "string") {
                (this as any)[key] = sqlstring.escape(value).slice(1, -1); // Sanitizar cadenas
            } else if (Array.isArray(value)) {
                (this as any)[key] = value.map((v) =>
                    typeof v === "string" ? sqlstring.escape(v).slice(1, -1) : v
                ); // Sanitizar arreglos de cadenas
            }
        }
    }
}
