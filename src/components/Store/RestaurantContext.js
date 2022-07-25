import React, { useState } from "react";

const RestaurantContext = React.createContext({
	restaurants: null,
	restaurantData: null,
	addRestaurant: () => {},
	removeRestaurant: () => {},
	getRestaurants: () => {},
});

export const RestaurantContextProvider = (props) => {
	const [restaurantData, setrestaurantData] = useState({});
	const [restaurants, setRestaurants] = useState();

	const addrestaurantData = (data) => {
		setrestaurantData([data]);
	};

	const removeRestaurantData = () => {
		setrestaurantData([]);
	};
	const getRestauranstHandler = (data) => {
		setRestaurants(data);
	};

	return (
		<RestaurantContext.Provider
			value={{
				restaurants: restaurants,
				restaurantData: restaurantData,
				addrestaurantData: addrestaurantData,
				removeRestaurantData: removeRestaurantData,
				getRestaurants: getRestauranstHandler,
			}}
		>
			{props.children}
		</RestaurantContext.Provider>
	);
};

export default RestaurantContext;
