import express from 'express';
import cors from "cors";
import config from "./config.js";
import morgan from 'morgan';
import userRoutes from  './routes/user.routes.js';

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

app.set('port', config.PORT);

app.get('/', (_, res) => {
    res.json({
        message: 'Welcome to my application'
    });
});

app.use('/api/users', userRoutes);

export default app;