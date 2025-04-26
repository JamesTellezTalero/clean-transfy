import { ApiProperty } from "@nestjs/swagger";
import { ValidationError } from "class-validator";

export class mappedErrors {
    @ApiProperty({ description: "Field that has the error" })
    item: string;
    @ApiProperty({ description: "Sent value" })
    previusValue: string;
    @ApiProperty({ description: "Validation error message" })
    message: string;
}

export const mapperErrorsUtils = (
    errors: ValidationError[],
    parentPath: string = "",
    index?: number
): mappedErrors[] => {
    const mapErrors = (
        errors: ValidationError[],
        parentPath: string
    ): mappedErrors[] => {
        return errors.reduce((acc: mappedErrors[], error) => {
            const path = parentPath
                ? `${parentPath}.${error.property}`
                : error.property;

            if (error.constraints) {
                acc.push({
                    item: index != null ? `${path} on index [${index}]` : path,
                    previusValue: error.value ? error.value.toString() : "",
                    message: Object.values(error.constraints).join(", ")
                });
            }

            if (error.children && error.children.length > 0) {
                const childPath = path;
                acc.push(...mapErrors(error.children, childPath));
            }

            return acc;
        }, []);
    };

    return mapErrors(errors, parentPath);
};
