import { useContext } from "react";
import OrderContext from "../../Store/OrderContext";
import CartItem from "./CartItem";

import "./Cart.css";

function Cart() {
	const orderCtx = useContext(OrderContext);
	console.log(orderCtx);

	const hasItems = orderCtx.items.length > 0;

	const total = `£ ${orderCtx.totalAmount.toFixed(2)}`;

	const cartItemRemoveHandler = (id) => {
		orderCtx.removeItem(id);
	};

	const cartItemAddHandler = (item) => {
		orderCtx.addItem({ ...item, amount: 1 });
	};

	return (
		hasItems && (
			<div className="orderFood">
				<h2>Confirm order</h2>
				<ul>
					{orderCtx.items.map((item) => (
						<CartItem
							key={item.name}
							qty={item.amount}
							name={item.name}
							price={item.price * item.amount}
							onRemove={cartItemRemoveHandler.bind(null, item.id)}
							onAdd={cartItemAddHandler.bind(null, item)}
						/>
					))}
					<li id="totalAmount">
						<span>Total</span>
						<span>{total}</span>
					</li>
				</ul>
			</div>
		)
	);
}
export default Cart;
