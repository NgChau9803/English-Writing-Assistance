import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

const GoogleSignIn = () => {
	const handleLogin = async (credentialResponse) => {
		var obj = jwtDecode(credentialResponse.credential);
		var data = JSON.stringify(obj);

		const config = {
			method: "POST",
			url: "http://localhost:5000/auth/google",
			headers: {
				"Content-Type": "application/json",
			},
			data: data,
		};

		await axios(config);
	};

	return (
		<GoogleOAuthProvider clientId={process.env.REACT_APP_CLIENT_ID}>
			<GoogleLogin
				onSuccess={handleLogin}
				onFailure={(error) => console.log(error)}
			/>
		</GoogleOAuthProvider>
	);
};

export default GoogleSignIn;
