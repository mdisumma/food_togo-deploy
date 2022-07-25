import { useState, useEffect, useCallback } from "react";
import Stars from "../assets/Stars";
import RateSystem from "../RateSystem/RateSystem";
import "./Delivery.css";
function Delivery(props) {
  const [orderDetails, setOrderDetails] = useState(undefined);
  const [orderStatus, setOrderStatus] = useState("");
  const [orderRated, setOrderRated] = useState("");
  const [estimateDelivery, setEstimateDelivery] = useState();

  const fetchOrderHandler = async () => {
    try {
      const response = await fetch(
        "https://food-togo.herokuapp.com/orderRouter"
      );

      const data = await response.json();
      data.reverse();
      // console.log(data);
      if (data && data[0].rated === 0) {
        setOrderDetails(data);
        setOrderStatus(data[0].status);
        setOrderRated(data[0].rated);
      }
    } catch (error) {
      console.log(error);
    }
  };

  function getRated(data) {
    setOrderRated(data);
  }
  useEffect(() => {
    console.log(orderStatus);
    console.log(orderRated);
    fetchOrderHandler();
    orderDetails &&
      setTimeout(() => {
        updateOrderStatusHandler();
      }, 5000);
  }, [fetchOrderHandler, orderStatus]);

  const updateOrderStatusHandler = async (e) => {
    let data;
    const response = await fetch(
      `https://food-togo.herokuapp.com/orderRouter/${orderDetails[0].id}`
    );
    data = await response.json();
    // console.log(data.status);
    if (data.status === "submitted") {
      try {
        const response = await fetch(
          `https://food-togo.herokuapp.com/orderRouter/${orderDetails[0].id}`,
          {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              status: "preparing",
            }),
          }
        );
        const data = await response.json();

        setOrderStatus(data.status);
      } catch (error) {
        console.log(error);
      }
    }
    if (data.status === "preparing") {
      try {
        const response = await fetch(
          `https://food-togo.herokuapp.com/orderRouter/${orderDetails[0].id}`,
          {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              status: "delivering",
            }),
          }
        );
        const data = await response.json();

        setOrderStatus(data.status);
      } catch (error) {
        console.log(error);
      }
    }
    if (data.status === "delivering") {
      try {
        const response = await fetch(
          `https://food-togo.herokuapp.com/orderRouter/${orderDetails[0].id}`,
          {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              status: "delivered",
            }),
          }
        );
        const data = await response.json();

        setOrderStatus(data.status);
      } catch (error) {
        console.log(error);
      }
    }
  };

  const resetOrderStatusHandler = async () => {
    try {
      const response = await fetch(
        `https://food-togo.herokuapp.com/orderRouter/${orderDetails[0].id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            status: "submitted",
          }),
        }
      );
      const data = await response.json();

      setOrderStatus(data.status);
    } catch (error) {
      console.log(error);
    }
  };

  function calcDeliveryTime() {
    if (orderDetails) {
      console.log(orderDetails[0].restaurant[0].expectedDelivery);
      const calcDate = orderDetails[0].restaurant[0].expectedDelivery;
      const calcTime = calcDate.toLocaleString().split(" ");
      setEstimateDelivery(calcTime[4].split(":").slice(0, 2).join(":"));
    }
  }
  useEffect(() => {
    calcDeliveryTime();
    console.log(estimateDelivery);
  }, [orderDetails, orderRated]);

  return orderDetails ? (
    <div>
      <button id="start" onClick={resetOrderStatusHandler}>
        start
      </button>

      <div className="delivery">
        <h2>Order status</h2>
        {orderStatus && orderRated === 0 && (
          <section className="orderStatus">
            <p>{`Estimated delivery at: ${estimateDelivery}`}</p>
            <h3>Order status</h3>
            <div className="status">
              <span
                className={`${
                  orderStatus === "delivered"
                    ? "noActiveStatus"
                    : "activeStatus"
                }`}
              />
              <p>{orderDetails[0].status}</p>
            </div>
          </section>
        )}
        {orderStatus === "delivered" && orderRated > 0 && (
          <div id="rated" className="delivery">
            <p>Thank you for your feedback</p>
            <p>{orderRated}</p>
            <Stars rate={orderRated} />
          </div>
        )}
      </div>

      {orderStatus && orderRated === 0 && (
        <div className="delivery">
          <h2>Delivery details</h2>

          <section className="orderDescription">
            <h3>Order Details</h3>

            <ul>
              <li>{`Order number: ${orderDetails[0].orderNumber}`}</li>
              <li>{`Date: ${orderDetails[0].date}`}</li>
              <li>{`Time: ${orderDetails[0].time}`}</li>
              <li>{`Notes: ${orderDetails[0].notes}`}</li>
            </ul>
            <h4>Delivery from:</h4>
            <ul>
              <li>{`Name: ${orderDetails[0].restaurant[0].name}`}</li>
              <li>{`Address: ${orderDetails[0].restaurant[0].address}`}</li>
              <li>{`Postcode: ${orderDetails[0].restaurant[0].postcode}`}</li>
              <li>{`City: ${orderDetails[0].restaurant[0].city}`}</li>
            </ul>
            <h4>Delivery to:</h4>
            <ul>
              <li>{`Name: ${orderDetails[0].firstName} ${orderDetails[0].lastName}`}</li>
              <li>{`Address: ${orderDetails[0].address}`}</li>
              <li>{`Postcode: ${orderDetails[0].postcode}`}</li>
              <li>{`City: ${orderDetails[0].city}`}</li>
            </ul>
            <h4>Order Items:</h4>
            <ul className="orderItems">
              {orderDetails[0].items.map((item) => (
                <li key={item.id}>
                  {<span>{`${item.amount} ${item.name}`}</span>}
                  {<span>{`£ ${item.totalAmount.toFixed(2)}`}</span>}
                </li>
              ))}
              <hr />
              <li>
                <span>Total amount:</span>
                <span>{`£ ${orderDetails[0].totalAmount.toFixed(2)}`}</span>
              </li>
            </ul>
          </section>
        </div>
      )}

      {orderStatus === "delivered" && orderRated === 0 && (
        <footer>
          <RateSystem
            orderId={orderDetails[0].id}
            restaurantId={orderDetails[0].restaurant[0].id}
            getRated={getRated}
          />
        </footer>
      )}
    </div>
  ) : (
    <div className="delivery">
      <h2>Order status</h2>
      <section className="orderStatus">
        <h3>Order status</h3>
        <p>No order to be delivered</p>
      </section>
    </div>
  );
}
export default Delivery;
