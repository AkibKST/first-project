import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import globalErrorHandler from './app/middlewares/globalErrorHandler';
import notFound from './app/middlewares/notFound';
import router from './app/routes';
import cookieParser from 'cookie-parser';

const app: Application = express();

//parsers
app.use(express.json());
app.use(cors());
app.use(cookieParser());
app.use(cors({ origin: ['http://localhost:5173'] }));

//application routes
app.use('/api/v1', router);

// Get a Controller call back function
const getAController = (req: Request, res: Response) => {
  const a = 10;
  res.send(a);
};

app.get('/', getAController);

app.use(globalErrorHandler);

//not found
app.use(notFound);

export default app;
