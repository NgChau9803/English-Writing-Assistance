import { createBrowserRouter, Navigate } from "react-router-dom";
import GoogleSignIn from "../views/Login/GoogleSignIn";
import Dashboard from "../views/Dashboard/Dashboard";
import AuthCheck from "../components/AuthCheck";

const router = createBrowserRouter([
	{
		path: "/",
		element: <GoogleSignIn />,
	},
	{
		path: "/dashboard",
		element: <Dashboard />,
		AuthCheck,
	},
	{
		path: "*",
		element: <Navigate to="/" />,
	},
]);

export default router;
