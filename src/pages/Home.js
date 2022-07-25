import React, { useState } from "react";

import HomeNav from "../components/Nav/HomeNav";
import PageTitle from "../components/PageTitle/PageTitle";
import SignUp from "../components/SignUp";
import Login from "../components/Login";
import DownloadApp from "../components/Button/DownloadApp";
import Social from "../components/Social/Social";

function Home(props) {
	const [title, setTitle] = useState("Welcome");
	const [login, setLogin] = useState(false);
	const [signUp, setSignUp] = useState(false);

	function setSubmited(value) {
		setTitle(value);
	}

	const logInHandler = () => {
		setTitle("Log in");
		setLogin(true);
		setSignUp(false);
	};

	const signUpHandler = () => {
		setTitle("Sign up");
		setLogin(false);
		setSignUp(true);
	};

	return (
		<>
			<HomeNav onLogin={logInHandler} onSignUp={signUpHandler} />
			<PageTitle title={title} />
			<div className="container">
				{login && <Login setSubmited={setSubmited} />}
				{signUp && <SignUp setSubmited={setSubmited} onClick={logInHandler} />}
				{!signUp && !login && <DownloadApp />}
			</div>
			<footer>
				<Social />
			</footer>
		</>
	);
}

export default Home;
