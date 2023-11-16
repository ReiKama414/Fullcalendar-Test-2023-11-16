import React from "react";
import { Outlet } from "react-router-dom";
import "./app.sass";

const App = () => {
	return (
		<div>
			<Outlet />
		</div>
	);
};

export default App;
