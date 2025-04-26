import {
    ExceptionFilter,
    Catch,
    ArgumentsHost,
    HttpException,
    HttpStatus,
    Request,
    NotFoundException,
    BadRequestException
} from "@nestjs/common";
import { ApiResponseDto } from "../../application/dtos/api-responses/api-response.dto";
import { InternalServerErrorResponse } from "src/shared/application/dtos/api-responses/errors/internal-server-error-response.dto";
import { NotFoundResponse } from "src/shared/application/dtos/api-responses/errors/not-found-error-response.dto";
import { BadRequestResponse } from "src/shared/application/dtos/api-responses/errors/bad-request-error-response.dto";

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
    catch(exception: unknown, host: ArgumentsHost) {
        const context = host.switchToHttp();
        const request = context.getRequest<Request>();
        const response = context.getResponse();

        console.error("=============================");
        console.error(
            `ERROR ${request.url}, exception: `,
            JSON.stringify(exception)
        );
        console.error("=============================");
        console.error("exception: ", exception);
        console.error("=============================");

        //    if(request.body?.fileName)
        // console.error(
        //     `ERROR ${request.url}, body: `,
        //     JSON.stringify(request.body)
        // );

        if (exception instanceof ApiResponseDto)
            response.status(exception.status).json(exception);
        else if (exception instanceof BadRequestException)
            response
                .status(exception?.getStatus())
                .json(new BadRequestResponse(exception?.message, null));
        else if (exception instanceof NotFoundException)
            response
                .status(exception?.getStatus())
                .json(new NotFoundResponse(exception?.message));
        else
            response
                .status(HttpStatus.INTERNAL_SERVER_ERROR)
                .json(new InternalServerErrorResponse("Internal Error"));
    }
}
