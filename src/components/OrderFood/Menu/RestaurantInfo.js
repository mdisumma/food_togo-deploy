import { useState, useContext } from "react";
import RestaurantContext from "../../Store/RestaurantContext";

import Stars from "../../assets/Stars";
import "./RestaurantInfo.css";

function RestaurantInfo(props) {
	const [width, setWidth] = useState("182.35");
	const restaurantCtx = useContext(RestaurantContext);
	const rate = restaurantCtx.restaurantData[0].avgRate;
	useState(() => {
		setWidth(restaurantCtx.restaurantData.rate);
	}, []);

	return (
		<div className="restaurantInfo">
			<ul>
				<li>{props.name}</li>
				<li>{props.address}</li>
				<li>
					<span className="rates">{props.rates}</span>
					<Stars rate={rate} />
					<span>{props.rate}</span>
				</li>
			</ul>
		</div>
	);
}

export default RestaurantInfo;
