import express from "express";
import cors from "cors";
import session from "express-session";
import bodyParser from "body-parser";
import chatRoutes from "./routes/chatRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import passport from "./config/passport.js";
import sequelize from "./config/database.js";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(
	session({
		secret: "rabitHole",
		resave: false,
		saveUninitialized: true,
		cookie: { secure: false, maxAge: 600000 }, // Set to true if using https
	})
);

app.use(
	cors({
		origin: "http://localhost:3000",
		methods: "GET,POST,PUT,DELETE,PATCH,OPTIONS",
		credentials: true,
        allowedHeaders: ["Content-Type", "Authorization"],
	})
);

app.use(passport.initialize());
app.use(passport.session());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

app.use("/auth", authRoutes);
app.use("/processText", chatRoutes);

app.listen(PORT, async () => {
	console.log(`Server is running on port ${PORT}`);
	await sequelize.sync({ force: false }); // Use the correct sequelize instance here
});
