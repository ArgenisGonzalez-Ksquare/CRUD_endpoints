import express, { Application, Request, Response } from 'express';
const app: Application = express();
/* import { UrlRouter } from './routes/Url.routes' */
import {TodoRouter} from './routes/Todo.routes';

app.use(express.json());
app.use('/u', TodoRouter);

app.get('/', (req: Request, res: Response) => {
    res.send('VIVEEEEEEEEEEE');
})


export default app;