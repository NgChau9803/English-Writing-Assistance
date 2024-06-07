import axios from "axios";
import db from "../db/db.js";

export const googleAuth = async (req, res) => {
	const { token } = req.body;

	try {
		const response = await axios.get(
			`https://oauth2.googleapis.com/tokeninfo?id_token=${token}`
		);
		const { email, sub: userId } = response.data;

		// Check if the user already exists in the database
		db.query("SELECT * FROM users WHERE email = ?", [email], (err, result) => {
			if (err) {
				return res.status(500).json({ error: "Database query error" });
			}

			if (result.length > 0) {
				// User exists
				res.status(200).json({ message: "User authenticated", email, userId });
			} else {
				// User does not exist, insert new user
				db.query(
					"INSERT INTO users (email, google_id) VALUES (?, ?)",
					[email, userId],
					(err, result) => {
						if (err) {
							return res.status(500).json({ error: "Database insert error" });
						}
						res
							.status(200)
							.json({
								message: "User authenticated and created",
								email,
								userId,
							});
					}
				);
			}
		});
	} catch (error) {
		res.status(400).json({ error: "Invalid token" });
	}
};
