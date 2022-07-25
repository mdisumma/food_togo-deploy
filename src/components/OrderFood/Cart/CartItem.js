import "./CartItem.css";
function CartItem(props) {
	const price = `£ ${props.price.toFixed(2)}`;

	return (
		<li className="item-details">
			<span>{props.qty}</span>
			<span>{props.name}</span>
			<span className="itemCounter">
				<button onClick={props.onRemove}>−</button>
				<button onClick={props.onAdd}>+</button>
			</span>
			<span>{price}</span>
		</li>
	);
}
export default CartItem;
