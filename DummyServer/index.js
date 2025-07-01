import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import { connectDB } from './db/connection.js';
import cookieParser from 'cookie-parser';
import userRoutes from './routes/user.js';
import itemRoutes from './routes/item.js';

const app = express();
const port = 8000;

await connectDB();

app.use(cors({origin: true, credentials: true}));
app.use(express.json());
app.use(cookieParser());
app.use('/user', userRoutes);
app.use('/items', itemRoutes);


app.listen(port, () => {
    console.log(`server is started in port ${port}`);
})