import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import bodyParser from 'body-parser';
import router from './routes/index.js';

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(cookieParser());

app.use("/google-auth", router);
app.use("/process-text", router);


export default app;
