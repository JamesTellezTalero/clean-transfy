import { ApiProperty } from "@nestjs/swagger";

export class ApiResponseDto<Item, Error> {
    @ApiProperty({ description: "HTTP Response Status" })
    status: number;
    @ApiProperty({ description: "HTTP Response Message" })
    message: string;
    @ApiProperty({ description: "HTTP Response Item" })
    item: Item;
    @ApiProperty({ description: "HTTP Response Error" })
    errors: Error;

    protected constructor(
        status: number,
        message: string,
        item?: any,
        errors?: any
    ) {
        this.status = status;
        this.message =
            status == 500
                ? "We encountered an unexpected issue on our server. Please try again later, and if the problem persists, contact our support team."
                : message;
        this.item = status == 500 || item == null ? null : item;
        this.errors = status != 200 || errors != null ? errors : null;
    }

    protected static createResponse<Item, Error>(
        status: number,
        message: string,
        item?: Item,
        errors?: Error
    ): ApiResponseDto<Item, Error> {
        return new ApiResponseDto(status, message, item, errors);
    }
}
