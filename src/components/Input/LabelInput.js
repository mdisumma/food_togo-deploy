import "./LabelInput.css";

function LabelInput(props) {
	return (
		<div className={`labelInput ${props.className}`}>
			<label htmlFor={props.htmlFor}>{props.label}</label>
			<input
				id={props.id}
				type={props.type}
				placeholder={props.placeholder}
				value={props.value}
				onChange={props.onChange}
				onBlur={props.onBlur}
			/>
			<div className="alert">{props.alert}</div>
		</div>
	);
}
export default LabelInput;
