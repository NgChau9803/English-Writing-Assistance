import express from "express";
import cookieParser from "cookie-parser";
import mysql2 from "mysql2";
import cors from "cors";
const app = express();
app.use(cors());

const db = mysql2.createConnection({
	host: "localhost",
	user: "root",
	password: "",
	database: "ss2",
	port: 3306,
});

const authenticate = (req, res, next) => {
	const token = req.cookies.token;
	if (!token) {
		return res.status(401).json({ message: "Unauthorized" });
	}
};

app.get("/login", (res, req) => {
	res.json({ message: "Please login" });
});
app.post("/login", (req, res) => {
	const { username, password } = req.body;
	db.query(
		`SELECT * FROM users WHERE username = '${username}' AND password = '${password}'`,
		(err, result) => {
			if (err) {
				return res.status(500).json({ message: "Internal server error" });
			}
			if (result.length === 0) {
				return res.status(401).json({ message: "Invalid credentials" });
			}
			res.cookie("token", "abc123");
			res.json({ message: "Logged in" });
		}
	);
});

app.get("/logout", (req, res) => {
	res.clearCookie("token");
	res.json({ message: "Logged out" });
});

app.get("/", (req, res) => {
	
});


const port = process.env.PORT || 3000;
app.listen(port, () => {
	console.log(`Server running on port ${port}`);
});
