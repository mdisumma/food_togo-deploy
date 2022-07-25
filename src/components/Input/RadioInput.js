import "./RadioInput.css";

function RadioInput(props) {
	return (
		<div className="radioInput">
			<label className={props.className} htmlFor={props.htmlFor}>
				{props.text}
			</label>
			<input
				type="radio"
				id={props.id}
				value={props.value}
				name={props.name}
				onClick={props.onClick}
				onChange={props.onChange}
				checked={props.checked}
			/>
		</div>
	);
}
export default RadioInput;
