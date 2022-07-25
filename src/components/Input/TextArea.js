import "./TextArea.css";

function TextArea(props) {
	return (
		<div className="textArea">
			<label htmlFor={props.htmlFor}>{props.label}</label>
			<textarea
				id={props.id}
				placeholder={props.placeholder}
				value={props.value}
				onChange={props.onChange}
			></textarea>
		</div>
	);
}
export default TextArea;
