import "./FullButton.css";

function FullButton(props) {
	return (
		<div>
			<button className="fullButton" onClick={props.onClick}>
				{props.text}
			</button>
		</div>
	);
}
export default FullButton;
