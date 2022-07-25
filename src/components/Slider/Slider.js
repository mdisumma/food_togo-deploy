import "./Slider.css";

function slider(e) {
	e.preventDefault();
	const slider = e.target.parentElement.firstChild;
	e.target.id === "slideLeft"
		? (slider.style.transform = "translateX(0%)")
		: (slider.style.transform = "translateX(100%)");
}

function Slider(props) {
	return (
		<div className="sliderContainer">
			<div className="slide"></div>
			<button id="slideLeft" className="select" onClick={slider}>
				{props.left}
			</button>
			<button id="slideRight" className="select" onClick={slider}>
				{props.right}
			</button>
		</div>
	);
}
export default Slider;
