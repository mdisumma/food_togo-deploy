import { useState } from "react";

import Dish from "./Dish";
import "./FoodCategorie.css";
function FoodCategory(props) {
	const [hideMenu, setHideMenu] = useState("hideMenu");

	function toggleMenu(e) {
		hideMenu ? setHideMenu("") : setHideMenu("hideMenu");
	}

	return (
		<>
			<div onClick={toggleMenu} className="categorieName">
				<h3>{props.categoryName}</h3>
			</div>
			<ul className={`menu ${hideMenu}`}>
				{props.categorie.map((dish) => (
					<Dish
						key={dish.name}
						id={dish.name}
						dishName={dish.name}
						price={dish.price}
						image={dish.image}
					/>
				))}
			</ul>
		</>
	);
}
export default FoodCategory;
