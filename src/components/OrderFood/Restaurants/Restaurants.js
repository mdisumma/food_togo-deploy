import { useContext } from "react";
import LeafIcon from "../../assets/LeafIcon";
import RestaurantContext from "../../Store/RestaurantContext";
import "./Restaurants.css";

function Restaurants(props) {
	const restaurantCtx = useContext(RestaurantContext);

	//Select restaurant

	function getData() {
		const expectedTime = new Date(
			new Date().getTime() + this.deliveryTime * 60000
		).toString();
		const restaurantData = {
			id: this.id,
			name: this.name,
			address: this.address,
			latitude: this.latitude,
			longitude: this.longitude,
			postcode: this.postcode,
			city: this.city,
			rate: this.rate,
			avgRate: this.avgRate,
			menu: this.menu,
			deliveryTime: this.deliveryTime,
			expectedDelivery: expectedTime,
		};

		restaurantCtx.addrestaurantData(restaurantData);
	}

	return (
		<div>
			{props.fetchRestaurant.map((restaurant) => (
				<div
					onClick={getData.bind(restaurant)}
					key={restaurant.name}
					className="restaurant"
				>
					<div id="image">
						<img src={restaurant.logo} alt="Restaurant logo" />
					</div>

					<div id="title">
						<h3>{restaurant.name}</h3>
						<p>{restaurant.description}</p>
					</div>
					<div id="time">
						<p>Time:</p>
						<p>{`${restaurant.deliveryTime} min`}</p>
					</div>
					<div className="restInfo" id="distance">
						<p>Distance:</p>
						<p>{props.distance && `${restaurant.distance} ml`}</p>
					</div>
					<div className="restInfo" id="type">
						{
							<>
								<p>Cuisine A-Z:</p>
								<p>{restaurant.type}</p>
							</>
						}
					</div>
					<div className="restInfo" id="vegan">
						<>
							<p>Vegetartian:</p>

							{restaurant.vegetarian === 1 && (
								<div className="leafContainer">
									<LeafIcon />
								</div>
							)}
							{restaurant.vegetarian === 2 && (
								<div className="leafContainer">
									<LeafIcon />
									<LeafIcon />
								</div>
							)}
							{restaurant.vegetarian === 3 && (
								<div className="leafContainer">
									<LeafIcon />
									<LeafIcon />
									<LeafIcon />
								</div>
							)}
						</>
					</div>

					<div className="restInfo" id="rate">
						{
							<>
								<p>Rating:</p>
								<span className="rateQty">{`(${restaurant.rate.length})`}</span>
								<span>{restaurant.avgRate.toFixed(2)}</span>
							</>
						}
					</div>
				</div>
			))}
		</div>
	);
}
export default Restaurants;
