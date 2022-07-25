import { useContext } from "react";
import OrderContext from "../Store/OrderContext";
import CartIcon from "../assets/CartIcon";
import "./CartButton.css";

function CartButton(props) {
	const orderCtx = useContext(OrderContext);

	const quantity = orderCtx.items.reduce((currentNumber, item) => {
		return currentNumber + item.amount;
	}, 0);

	return (
		<button className="cartButton" onClick={props.onClick}>
			<span className="icon">
				<CartIcon />
			</span>
			<span className={`qty ${quantity > 0 ? "qtyFull" : ""}`}>{quantity}</span>
		</button>
	);
}

export default CartButton;
