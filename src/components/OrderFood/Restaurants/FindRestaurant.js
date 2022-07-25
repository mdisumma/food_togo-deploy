import { useState, useEffect, useContext } from "react";
import RestaurantContext from "../../Store/RestaurantContext";
import AddressContext from "../../Store/AddressContext";

import RadioInput from "../../Input/RadioInput";
import ButtonInput from "../../Input/ButtonInput";
import FilterButton from "../../Button/FilterButton";
import Restaurants from "./Restaurants";

import "./FindRestaurant.css";

function FindRestaurant(props) {
  const [restaurantsList, setRestaurantList] = useState(false);
  const [method, setMethod] = useState();
  const [inputValue, setInputValue] = useState();
  const [alert, setAlert] = useState(true);
  const [distance, setDistance] = useState();
  const [restaurants, setRestaurants] = useState([]);

  const restaurantCtx = useContext(RestaurantContext);
  const addressCtx = useContext(AddressContext);

  //get radio input value
  const getRadioInputValue = (e) => {
    setMethod(e.target.value);
  };

  //get input value
  const getInputValue = (e) => {
    setAlert(true);
    setInputValue(e.target.value.trim());
  };

  // Fetch restaurant and coordinates by postcode
  const fetchRestaurantHandler = async () => {
    try {
      const response = await fetch(
        "https://food-togo.herokuapp.com/restaurantRouter"
      );
      const data = await response.json();
      restaurantCtx.getRestaurants(data);
      setRestaurants(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchRestaurantHandler();
  }, []);

  const maxDistance = 10;
  //get user coordinate from postcode (input value)
  const getInputCoordinates = async (e) => {
    e.preventDefault();

    if (inputValue) {
      try {
        const response = await fetch(
          `https://api.postcodes.io/postcodes/${inputValue}`
        );
        const data = await response.json();
        if (data.status === 200) {
          setAlert(true);
          const userLat = data.result.latitude;
          const userLon = data.result.longitude;
          addressCtx.getDeliveryCoordinate({
            postcode: inputValue,
            latitude: userLat,
            longitude: userLon,
          });

          restaurantCtx.restaurants.map((restaurant) => {
            const restaurantLat = restaurant.latitude;
            const restaurantLon = restaurant.longitude;
            const getDistance = haversine_distance(
              userLat,
              userLon,
              restaurantLat,
              restaurantLon
            );
            //delivery time
            restaurant.distance = getDistance.toFixed(2);
            restaurant.deliveryTime = (
              restaurant.distance * (60 / 10) +
              30
            ).toFixed(0);
            //average rate
            restaurant.avgRate =
              restaurant.rate.reduce((sum, value) => {
                return sum + value;
              }, 0) / restaurant.rate.length;
          });
          setDistance(true);
          if (method === "deliver") {
            setRestaurants(
              restaurantCtx.restaurants.filter(
                (restaurant) =>
                  restaurant.distance < maxDistance &&
                  restaurant.delivery === true
              )
            );
          }
          if (method === "collect") {
            setRestaurants(
              restaurantCtx.restaurants.filter(
                (restaurant) => restaurant.distance < maxDistance
              )
            );
          }
          if (!method) {
            setRestaurants(
              restaurantCtx.restaurants.filter(
                (restaurant) => restaurant.distance < maxDistance
              )
            );
          }
          setRestaurantList(true);
        }
        if (data.status === 404) {
          setAlert(false);
          setDistance(false);
        }
      } catch (error) {
        console.log(error);
      }
    }
    if (!inputValue) {
      setAlert(false);
    }
  };

  //sort restaurants by categories
  const sortedFilter = (data) => {
    if (method === "deliver") {
      setRestaurants(
        data.filter(
          (restaurant) =>
            restaurant.distance < maxDistance && restaurant.delivery === true
        )
      );
    }
    if (method === "collect") {
      setRestaurants(
        data.filter((restaurant) => restaurant.distance < maxDistance)
      );
    }
    if (!method) {
      setRestaurants(
        data.filter((restaurant) => restaurant.distance < maxDistance)
      );
    }
  };

  // Haversine formula
  function haversine_distance(userLat, userLon, restaurantLat, restaurantLon) {
    var R = 3958.8; // Radius of the Earth in miles
    var rlat1 = userLat * (Math.PI / 180); // Convert degrees to radians
    var rlat2 = restaurantLat * (Math.PI / 180); // Convert degrees to radians
    var difflat = rlat2 - rlat1; // Radian difference (lat)
    var difflon = (restaurantLon - userLon) * (Math.PI / 180); // Radian difference (lon)

    var d =
      2 *
      R *
      Math.asin(
        Math.sqrt(
          Math.sin(difflat / 2) * Math.sin(difflat / 2) +
            Math.cos(rlat1) *
              Math.cos(rlat2) *
              Math.sin(difflon / 2) *
              Math.sin(difflon / 2)
        )
      );
    return d;
  }

  return (
    <>
      <div className="findRestaurant">
        <h2>Find restaurants</h2>
        <form onSubmit={getInputCoordinates}>
          <div className="radioInputs">
            <RadioInput
              className={method === "deliver" ? "active" : ""}
              htmlFor={"deliver"}
              text={"deliver"}
              id={"deliver"}
              value={"deliver"}
              name={"method"}
              onChange={getRadioInputValue}
            />

            <RadioInput
              className={method === "collect" ? "active" : ""}
              htmlFor={"collect"}
              text={"collect"}
              id={"collect"}
              value={"collect"}
              name={"method"}
              onChange={getRadioInputValue}
            />
          </div>

          <ButtonInput
            className={alert === false ? "invalid" : ""}
            alert={alert === false ? "please insert a valid postcode" : ""}
            label={"postcode"}
            text={"find"}
            id={"userPostcode"}
            value={inputValue}
            type={"text"}
            placeholder={"insert postcode"}
            onChange={getInputValue}
            // onBlur={}
          />
        </form>

        {restaurantsList && <FilterButton sortedFilter={sortedFilter} />}
        {restaurantsList && (
          <Restaurants fetchRestaurant={restaurants} distance={distance} />
        )}
      </div>
    </>
  );
}
export default FindRestaurant;
