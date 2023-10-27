import express from 'express';
import cors from "cors";
import config from "./config.js";
import morgan from 'morgan';
import userRoutes from './routes/user.routes.js';
import sessionRoutes from './routes/session.routes.js';
import productRoutes from './routes/product.routes.js';
import purchaseRoutes from './routes/purchase.routes.js';
import multer from 'multer';

const app = express();

/* Implemented form-data requests */
const storage = multer.memoryStorage();
const upload = multer({ storage });

app.use(cors()); /* Enable cors */
app.use(express.json()); /* Enable json bodys */
app.use(morgan('dev')); /* Enable morgan to see information of the requests */
app.use(express.urlencoded({ extended: true })); /* Enable urlencoded bodys */

app.set('port', config.PORT);

app.get('/', (_, res) => {
    res.json({
        message: 'Welcome to my application'
    });
});

app.use('/', upload.none());

app.use('/api/products', productRoutes);

app.use('/api/purchase', purchaseRoutes);

app.use('/api/users', userRoutes);

app.use('/api/auth', sessionRoutes);

export default app;