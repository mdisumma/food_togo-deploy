import React, { useContext } from "react";
import AuthContext from "./components/Store/AuthContext";

import "./App.css";
import Home from "./pages/Home";
import User from "./pages/User";

function App() {
	const AutCtx = useContext(AuthContext);

	return (
		<>
			{!AutCtx.isLoggedIn && <Home />}
			{AutCtx.isLoggedIn && <User />}
		</>
	);
}

export default App;
