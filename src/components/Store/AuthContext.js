import React, { useState, useEffect } from "react";

const AuthContext = React.createContext({
	userData: [],
	isLoggedIn: false,
	onLogOut: () => {},
	onLogIn: (userName) => {},
	getUserData: () => {},
});

export const AuthContextProvider = (props) => {
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const [userData, setUserData] = useState([]);

	useEffect(() => {
		if (localStorage.getItem("LoggedIn")) setIsLoggedIn(true);
	}, []);

	const logInHandler = (userName) => {
		localStorage.setItem("LoggedIn", "true");
		localStorage.setItem("userName", userName);

		setIsLoggedIn(true);
	};

	const logOutHandler = () => {
		localStorage.removeItem("LoggedIn");
		localStorage.removeItem("userName");

		setIsLoggedIn(false);
	};
	const getUserDataHandler = (data) => {
		setUserData(data);
	};

	return (
		<AuthContext.Provider
			value={{
				userData: userData,
				isLoggedIn: isLoggedIn,
				onLogOut: logOutHandler,
				onLogIn: logInHandler,
				getUserData: getUserDataHandler,
			}}
		>
			{props.children}
		</AuthContext.Provider>
	);
};

export default AuthContext;
