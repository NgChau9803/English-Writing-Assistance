import mysql2 from "mysql2";

const db = mysql2.createConnection({
	host: "localhost",
	user: "root",
	password: "0354387203",
	database: "SS2",
	port: 3306,
});

db.connect((err) => {
	if (err) {
		console.error("Database connection failed: " + err.stack);
		return;
	}
	console.log("Connected to database.");
});

export default db;
