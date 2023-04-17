import { ExceptionFilter, Catch, ArgumentsHost, HttpStatus,HttpException } from '@nestjs/common';
import { Request, Response } from 'express';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
    catch(exception: any, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const request = ctx.getRequest<Request>();

        const status = exception instanceof HttpException
            ? exception.getStatus()
            : HttpStatus.INTERNAL_SERVER_ERROR;

        const message = exception.message || 'Internal server error';

        response.status(status).json({
            statusCode: status,
            message,
            timestamp: new Date().toISOString(),
            path: request.url,
            success: false
        });
    }
}


// import { ExceptionFilter, Catch, ArgumentsHost, HttpException } from "@nestjs/common";
// import { Request, Response } from "express";
//
// @Catch(HttpException)
// export class HttpFilter implements ExceptionFilter{
//     catch(exception: HttpException, host: ArgumentsHost): any {
//         const context = host.switchToHttp();
//         const request  = context.getRequest<Request>();
//         const response  = context.getResponse<Response>();
//         response.status(exception.getStatus()).json({
//             success:false,
//             time: new Date().getTime(),
//             message: exception.message,
//             status: exception.getStatus(),
//             path: request.url
//         })
//     }
// }
