import "./PageTitle.css";

function PageTitle(props) {
	return (
		<div className="pageTitle">
			<h1>{props.title}</h1>
		</div>
	);
}

export default PageTitle;
