import passport from "passport";
import dotenv from "dotenv";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import User from "../models/user.js";

dotenv.config();

passport.use(
	new GoogleStrategy(
		{
			clientID: process.env.CLIENT_ID,
			clientSecret: process.env.CLIENT_SECRET,
			callbackURL: "http://localhost:5000/auth/google/callback",
			scope: ["profile", "email"],
		},
		async (token, refreshToken, profile, callback) => {
			try {
				let user = await User.findOne({ where: { googleId: profile.id } });
				if (!user) {
					user = await User.create({
						googleId: profile.id,
						name: profile.displayName,
					});
				}
				callback(null, user);
			} catch (error) {
				callback(error, null);
			}
		}
	)
);

passport.serializeUser((user, done) => {
	done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
	try {
		const user = await User.findByPk(id);
		done(null, user);
	} catch (error) {
		done(error, null);
	}
});

export default passport;
