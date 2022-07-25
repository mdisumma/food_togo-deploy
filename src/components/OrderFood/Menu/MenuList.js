import { useContext } from "react";
import RestaurantContext from "../../Store/RestaurantContext";
import RestaurantInfo from "./RestaurantInfo";
import FoodCategory from "./FoodCategorie";
import "./MenuList.css";

function MenuList(props) {
	const restaurantCtx = useContext(RestaurantContext);
	console.log(restaurantCtx);

	const { name, address, avgRate, rate, menu } =
		restaurantCtx.restaurantData[0];
	console.log(avgRate);

	return (
		<>
			<RestaurantInfo
				name={name}
				address={address}
				rate={avgRate.toFixed(2)}
				rates={`( ${rate.length} )`}
			/>
			<section className="menuList">
				<h2>choose your food</h2>
				<FoodCategory categoryName={"Starter"} categorie={menu.starter} />

				<FoodCategory
					categoryName={"Main Course"}
					categorie={menu.mainCourse}
				/>

				<FoodCategory categoryName={"Dessert"} categorie={menu.dessert} />

				<FoodCategory categoryName={"Drink"} categorie={menu.drink} />
			</section>
		</>
	);
}
export default MenuList;
