import {
  Catch,
  ArgumentsHost,
  HttpException,
  ExceptionFilter,
  HttpStatus,
  NotFoundException,
} from '@nestjs/common';
import { Response, Request } from 'express';
import { EntityNotFoundError, QueryFailedError } from 'typeorm';

@Catch(HttpException, QueryFailedError, EntityNotFoundError, NotFoundException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    let message = (exception as any).message.message;

    let code = 'HttpException';

    let status = HttpStatus.INTERNAL_SERVER_ERROR;

    switch (exception.constructor) {
      case HttpException:
        status = (exception as HttpException).getStatus();
        break;
      case QueryFailedError: // this is a TypeOrm error
        status = HttpStatus.UNPROCESSABLE_ENTITY;
        break;
      case EntityNotFoundError: // this is another TypeOrm error
        status = HttpStatus.UNPROCESSABLE_ENTITY;
        break;
      default:
        status = HttpStatus.INTERNAL_SERVER_ERROR;
    }

    message = exception.message;
    code = (exception as any).code;

    console.log(exception);

    console.error(
      `**********************************************************************************************
      
      An Error Occured with message: ${message} ,and code: ${code}, and the cuase is: ${exception.cause} with path: ${request.path}

      **********************************************************************************************`,
    );

    return response.status(status).json({
      error: {
        message,
        code,
        timestamp: new Date().toISOString(),
        path: request.url,
      },
    });
  }
}
