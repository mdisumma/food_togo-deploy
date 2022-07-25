import { useContext, useState } from "react";
import RestaurantContext from "../Store/RestaurantContext";

import "./FilterButton.css";

function FilterButton(props) {
	const [distance, setDistance] = useState(false);
	const [cuisine, setCuisine] = useState(false);
	const [vegetarian, setVegetarian] = useState(false);
	const [rating, setRating] = useState(false);

	const restaurantCtx = useContext(RestaurantContext);
	let sortedFilter = [];
	function resetFilter() {
		setDistance(false);
		setCuisine(false);
		setVegetarian(false);
		setRating(false);
	}
	const filterDistance = () => {
		resetFilter();
		sortedFilter = restaurantCtx.restaurants.sort(function (a, b) {
			return a.distance > b.distance ? 1 : -1;
		});
		setDistance(true);
		props.sortedFilter(sortedFilter);
	};

	const filterCuisine = () => {
		resetFilter();
		sortedFilter = restaurantCtx.restaurants.sort(function (a, b) {
			return a.type > b.type ? 1 : -1;
		});
		setCuisine(true);
		props.sortedFilter(sortedFilter);
	};

	const filterVegetarian = () => {
		resetFilter();
		sortedFilter = restaurantCtx.restaurants.sort(function (a, b) {
			return a.vegetarian > b.vegetarian ? -1 : 1;
		});
		setVegetarian(true);
		props.sortedFilter(sortedFilter);
	};

	const filterRating = () => {
		resetFilter();
		sortedFilter = restaurantCtx.restaurants.sort(function (a, b) {
			return a.rate > b.rate ? -1 : 1;
		});
		setRating(true);
		props.sortedFilter(sortedFilter);
	};

	return (
		<div className="filterList">
			<button className={distance ? "active" : ""} onClick={filterDistance}>
				Distance
			</button>
			<button className={cuisine ? "active" : ""} onClick={filterCuisine}>
				A-Z
			</button>
			<button className={vegetarian ? "active" : ""} onClick={filterVegetarian}>
				Vegetarian
			</button>
			<button className={rating ? "active" : ""} onClick={filterRating}>
				Rating
			</button>
		</div>
	);
}
export default FilterButton;
