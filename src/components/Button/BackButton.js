import BackIcon from "../assets/BackIcon";
import "./BackButton.css";

function BackButton(props) {
	return (
		<button className="backButton" onClick={props.onClick}>
			<BackIcon />
		</button>
	);
}
export default BackButton;
