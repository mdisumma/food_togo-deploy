import { useState, useContext } from "react";
import OrderContext from "../../Store/OrderContext";

import "./Dish.css";

function Dish(props) {
	const orderCtx = useContext(OrderContext);

	const [counterHide, setCounterHide] = useState("dish-qty-hide");
	const [checked, setChecked] = useState(false);
	const [quantity, setQuantity] = useState(0);

	function dropCounter(e) {
		if (e.target.checked) {
			setCounterHide("");
			setChecked(true);
		} else {
			setCounterHide("dish-qty-hide");
			setChecked(false);
		}
	}

	function addQuantity() {
		setQuantity(() => quantity + 1);
	}

	function removeQuantity() {
		if (quantity === 0);
		else setQuantity(() => quantity - 1);
	}

	const submitOrder = () => {
		if (quantity > 0) {
			orderCtx.addItem({
				id: props.id,
				name: props.dishName,
				price: props.price,
				amount: quantity,
				totalAmount: quantity * props.price,
			});

			setChecked(false);
			setCounterHide("dish-qty-hide");
			setQuantity(0);
		}
	};

	return (
		<li>
			<div className="dish">
				<div className="dish-image">
					<img src={props.image} alt="delicious food" />
				</div>
				<div className="dish-data">
					<h3>{props.dishName}</h3>
					<p>{props.description}</p>
					<p>{`£ ${props.price.toFixed(2)}`}</p>
				</div>
				<div className="dish-select">
					<input
						type="checkbox"
						id="dish-select"
						name="dish-select"
						value="dish-select"
						checked={checked}
						onClick={dropCounter}
						readOnly
					/>
				</div>
			</div>
			<div className={`dish-qty ${counterHide}`}>
				<div className="dish-qty-counter">
					<button onClick={removeQuantity}>-</button>
					<input
						type="text"
						value={quantity}
						onChange={() => setQuantity(quantity)}
					/>
					<button onClick={addQuantity}>+</button>
				</div>
				<button onClick={submitOrder}>Add to basket</button>
			</div>
		</li>
	);
}
export default Dish;
