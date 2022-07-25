import "./UserNav.css";

function UserNav(props) {
	return (
		<nav className="userNav">
			<div className="icons">{props.iconLeft}</div>
			<div className="icons">{props.iconRight}</div>
		</nav>
	);
}
export default UserNav;
