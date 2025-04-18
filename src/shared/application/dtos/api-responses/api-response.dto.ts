export class ApiResponseDto {
    status: number;
    message: string;
    item: any;
    errors: any;

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

    protected static createResponse(
        status: number,
        message: string,
        item?: any,
        errors?: any
    ): ApiResponseDto {
        return new ApiResponseDto(status, message, item, errors);
    }
}
