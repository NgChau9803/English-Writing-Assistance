import {
	createBrowserRouter,
	redirect,
} from "react-router-dom";
import Dashboard from "../views/Dashboard/Dashboard";
import  token from "../plugins/token"
import GoogleSignIn from "../views/Login/GoogleSignIn";

const router = createBrowserRouter([
	{
		id: "normalUser",
		path: "/",
		children: [
			{
				index: true,
				Component: GoogleSignIn,
			},
		],
	},
	{
		id: "loginUser",
		path: "/dashboard",
		// loader: protectedLoader,
		children: [
			{
				path: "/dashboard",
				Component: Dashboard,
				// loader: protectedLoader,
			},
			{
				path: "*",
				loader: () => redirect("/"),
			}
		],
	},
]);

function protectedLoader({ request }) {
	// If the user is not logged in and tries to access `/protected`, we redirect
	// them to `/login` with a `from` parameter that allows login to redirect back
	// to this page upon successful authentication
	if (!token.getClaims()) {
		let params = new URLSearchParams();
		params.set("from", new URL(request.url).pathname);
		return redirect("/login?" + params.toString());
	}
	return null;
}

export default router;
