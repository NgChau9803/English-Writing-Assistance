import "./GoogleSignIn.css";
import React from "react";
import dotenv from "dotenv";
dotenv.config();

function Login() {
	const googleAuth = () => {
		window.open(
			`${process.env.REACT_APP_API_URL}/auth/google/callback`,
			"_self"
		);
	};
	return (
		<div className="container">
			<h1 className="heading">Authenticate Form</h1>
			<div className="form_container">
				<div className="right">
					<button className="google_btn" onClick={googleAuth}>
						<img src="google.png" alt="google icon" />
						<span>Sign in with Google</span>
					</button>
				</div>
			</div>
		</div>
	);
}

export default Login;