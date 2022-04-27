import * as express from 'express';
import * as http from 'http';
import ClientRouter from './ClientRouter';

type NextFunction = express.NextFunction;
type Request = express.Request;
type Response = express.Response;

export function init(app: express.Application): void {
    const router: express.Router = express.Router();

    app.use('/v1/clients', ClientRouter);

    app.use((req: Request, res: Response, next: NextFunction) => {
        res.status(404).send(http.STATUS_CODES[404]);
    });

    app.use(router);
}