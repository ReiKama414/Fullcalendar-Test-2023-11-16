import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App";
import Home from "./pages/Home";
import reportWebVitals from "./test/reportWebVitals";
import "./index.sass";

const router = createBrowserRouter([
	{
		path: "/",
		element: <App />,
		// errorElement: <ErrorMessage />,
		children: [
			{
				index: true,
				element: <Home />,
			},
		],
	},
]);

ReactDOM.createRoot(document.getElementById("root")).render(
	// <React.StrictMode>
	<RouterProvider router={router} />
	// </React.StrictMode>
);

reportWebVitals();
