import express from 'express';
import morgan from 'morgan';
import cors from 'cors'
import {createConnection} from 'typeorm'

import userRoutes from './routes/user.routes'

const app = express();
createConnection();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// routes
app.get('/', (_request, response) => {
    response.json({msg: 'There is nothing for humans :)'});
});
app.use(userRoutes);

app.listen(3002);
console.log('Server on port', 3002);