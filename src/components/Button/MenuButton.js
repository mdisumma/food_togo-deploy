import { useState, useContext } from "react";
import AuthContext from "../Store/AuthContext";
import MenuIcon from "../assets/MenuIcon";

import "./MenuButton.css";

function MenuButton(props) {
	const [dropMenuList, setDropMenuList] = useState(false);
	const authCtx = useContext(AuthContext);

	function toggleMenu() {
		setDropMenuList(() => !dropMenuList);
	}

	return (
		<div className="dropdownMenu">
			<button onClick={toggleMenu} className="menuBtn">
				<MenuIcon />
			</button>
			{dropMenuList && (
				<div className="dropdownList">
					<button
						className={props.accountActive ? "active" : ""}
						onClick={props.onAccount}
					>
						Account
					</button>
					<button
						className={props.orderActive ? "active" : ""}
						onClick={props.onOrder}
					>
						Order
					</button>
					<button
						className={props.deliveryActive ? "active" : ""}
						onClick={props.onDelivery}
					>
						Delivery
					</button>
					<button onClick={authCtx.onLogOut}>Logout</button>
				</div>
			)}
		</div>
	);
}
export default MenuButton;
