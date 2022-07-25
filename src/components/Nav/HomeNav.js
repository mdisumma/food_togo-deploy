// import React from "react";

import "./HomeNav.css";

function HomeNav(props) {
	return (
		<nav className="homeNav">
			<div className="logo">
				<img src="./image/togo-full-logo.svg" alt="" />
			</div>
			<div className="auth">
				<button onClick={props.onSignUp}>Sign up</button>
				<button onClick={props.onLogin}> Login</button>
			</div>
		</nav>
	);
}
export default HomeNav;
