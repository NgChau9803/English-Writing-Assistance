import express from 'express';
import cors from 'cors';
import session from 'express-session';
import bodyParser from 'body-parser';
import db from './models/index.js';
import chatRoutes from './routes/chatRoutes.js';
import authRoutes from './routes/authRoutes.js';
import passport from './config/passport.js';
import dotenv from 'dotenv';
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(
    session({
        secret: 'cyberwolve', // Use a strong secret key
        resave: false,
        saveUninitialized: true,
        cookie: { secure: false } // Set to true if using https
    })
);

app.use(
    cors({
        origin: 'http://localhost:3000',
        methods: 'GET,POST,PUT,DELETE',
        credentials: true
    })
);

app.use(passport.initialize());
app.use(passport.session());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

app.use('/auth', authRoutes);
app.use('/processText', chatRoutes);

app.listen(PORT, async () => {
    console.log(`Server is running on port ${PORT}`);
    await db.sequelize.sync({ force: false });
});
