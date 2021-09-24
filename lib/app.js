import express from 'express';
import notFoundMiddleware from './middleware/not-found.js';
import errorMiddleware from './middleware/error.js';
import facts from './controllers/dogFacts.js';

const app = express();

app.use(express.json());

app.use('/api/resources/dogs', facts);

app.use(notFoundMiddleware);
app.use(errorMiddleware);

export default app;

