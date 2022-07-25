import { useEffect, useState, useCallback } from "react";
import StarIcon from "../assets/StarIcon";
import "./RateSystem.css";

function RateSystem(props) {
  const colorRate = [
    "transparent",
    "transparent",
    "transparent",
    "transparent",
    "transparent",
  ];
  const [color, setColor] = useState(colorRate);
  const [rate, setRate] = useState();

  const submitRate = async (restaurantId, orderId, rateValue) => {
    try {
      const response = await fetch(
        `https://food-togo.herokuapp.com/restaurant/${restaurantId}`
      );
      const data = await response.json();

      if (data) {
        data.rate.push(rateValue);
        console.log(data.rate);
        const response = await fetch(
          `https://food-togo.herokuapp.com/restaurantRate/${restaurantId}`,
          {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data.rate),
          }
        );
      }
      if (data.rate) {
        const response = await fetch(
          `https://food-togo.herokuapp.com/orderRouter/${orderId}`,
          {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              rated: rateValue,
            }),
          }
        );
      }
    } catch (error) {
      console.log(error);
    }
  };

  function rateSistemHandler(e) {
    const rateId = e.target.id;
    const rateValue = Number(rateId.slice(rateId.length - 1));
    for (let i = 0; i < rateValue; i++) {
      colorRate[i] = "var(--brand-color)";
    }
    setColor(colorRate);
    setRate(rateValue);
    console.log(rateValue);
    if (rateValue > 0) {
      submitRate(props.restaurantId, props.orderId, rateValue);
      props.getRated(rateValue);
    }
  }

  return (
    <div onClick={rateSistemHandler} className="rateSistem">
      <p className="label">Rate:</p>
      <div className="stars">
        <StarIcon id="star1" color={color[0]} />
        <StarIcon id="star2" color={color[1]} />
        <StarIcon id="star3" color={color[2]} />
        <StarIcon id="star4" color={color[3]} />
        <StarIcon id="star5" color={color[4]} />
      </div>
    </div>
  );
}
export default RateSystem;
