import * as express from 'express';
import * as Routes from '../../routes';

import * as Middleware from '@/config/middleware/middleware';

const app: express.Application = express();

Middleware.configure(app);

Routes.init(app);

app.set('port', process.env.PORT || 3000);

app.set('secret', process.env.SECRET || 'superSecret');

export default app;