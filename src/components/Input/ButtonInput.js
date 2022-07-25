import "./ButtonInput.css";

function ButtonInput(props) {
	return (
		<>
			<div className={`filterInput ${props.className}`}>
				<div className="buttonInput">
					<input
						onChange={props.onChange}
						onBlur={props.onBlur}
						id={props.id}
						type={props.type}
						placeholder={props.placeholder}
					/>
					<button onClick={props.onClick}>{props.text}</button>
				</div>
			</div>
			<div className="alert">{props.alert}</div>
		</>
	);
}
export default ButtonInput;
