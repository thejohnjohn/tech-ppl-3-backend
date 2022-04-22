import { StatusCodes } from 'http-status-codes';
import * as bodyParser from 'body-parser';
import * as compression from 'compression';
import * as cookieParser from 'cookie-parser';
import * as cors from 'cors';
import * as express from 'express';
import helmet from 'helmet';

import { HttpError } from '@/config/error';
import { sendHttpErrorModule } from '@/config/error/sendHttpError';
import Logger from '@/utils/Logger';

export function configure(app: express.Application): void {
    app.use(
        bodyParser.urlencoded({
            extended: false,
        })
    );
    app.use(bodyParser.json());
    app.use(cookieParser());
    app.use(compression());
    app.use(helmet());
    app.use(cors({
        exposedHeaders: ['Authorization'],
        optionsSuccessStatus: StatusCodes.OK,
    }));
};

interface CustomResponse extends express.Response {
    sendHttpError: (error: HttpError | Error, message?: string) => void;
}

export function initErrorHandler(app: express.Application): void {
    app.use((error: Error, req: express.Request, res: CustomResponse, next: express.NextFunction) => {
        if (typeof error === 'number') {
            error = new HttpError(error); // next(404)
        }

        if (error instanceof HttpError) {
            res.sendHttpError(error);
        } else {
            if (app.get('env') === 'development') {
                error = new HttpError(StatusCodes.INTERNAL_SERVER_ERROR, error.message);
                res.sendHttpError(error);
            } else {
                error = new HttpError(StatusCodes.INTERNAL_SERVER_ERROR);
                res.sendHttpError(error, error.message);
            }
        }

        Logger.error(error);
    });
}