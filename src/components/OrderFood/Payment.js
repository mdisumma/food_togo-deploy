import { useState, useContext, useEffect } from "react";
import AuthContext from "../Store/AuthContext";
import AddressContext from "../Store/AddressContext";
import OrderContext from "../Store/OrderContext";
import RestaurantContext from "../Store/RestaurantContext";
import LabelInput from "../Input/LabelInput";
import RadioInput from "../Input/RadioInput";

import "./Payment.css";
function Payment(props) {
	const [payment, setPayment] = useState();
	const [cardName, setCardName] = useState("");
	const [cardNumber, setCardNumber] = useState("");
	const [securityNumber, setSecurityNumber] = useState("");
	const [cardNameIsvalid, setCardNameIsValid] = useState();
	const [cardNumberIsvalid, setCardNumberIsValid] = useState();
	const [securityNumberIsvalid, setSecurityNumberIsValid] = useState();
	const [paymentIsValid, setPaymentIsValid] = useState();
	//AuthContext
	const authCtx = useContext(AuthContext);
	const { userData } = authCtx;
	// console.log(authCtx.userData);
	//RestaurantContext
	const restaurantCtx = useContext(RestaurantContext);

	// console.log(restaurantData);

	//OrderContext
	const orderCtx = useContext(OrderContext);
	// console.log(orderCtx.items);

	//AddressContext
	const addressCtx = useContext(AddressContext);
	// console.log(addressCtx);

	//Current Date
	const getDate = new Date();
	const orderDate = {
		date: `${getDate.getDate()}-${getDate.getMonth()}-${getDate.getFullYear()}`,
		time: `${getDate.getHours()}:${getDate.getMinutes()}`,
	};

	const getRadioInputValue = (e) => {
		// console.log(submitOrder);
		// console.log(payment);
		setPayment(e.target.value);
		if (e.target.value === "newCard") {
			setCardName("");
			setCardNumber("");
			setSecurityNumber("");
		}
		if (e.target.value === "userCard") {
			setCardName(userData.cardName);
			setCardNumber(userData.cardNumber);
			setSecurityNumber("");
			setCardNameIsValid(true);
			setCardNumberIsValid(true);
			// setSecurityNumberIsValid(true);
		}
	};

	const submitOrder = {
		date: orderDate.date,
		time: orderDate.time,
		status: "order submitted",
		rated: false,
		firstName: authCtx.userData.firstName,
		lastName: authCtx.userData.lastName,
		address: addressCtx.deliveryAddress[0].address,
		postcode: addressCtx.deliveryAddress[0].postcode,
		city: addressCtx.deliveryAddress[0].city,
		coordinate: {
			postcode: addressCtx.deliveryCoordinate.postcode,
			latitude: addressCtx.deliveryCoordinate.latitude,
			longitude: addressCtx.deliveryCoordinate.longitude,
		},
		notes: addressCtx.deliveryAddress[0].notes,
		restaurant: restaurantCtx.restaurantData[0],
		items: orderCtx.items.map((item) => ({
			id: item.id,
			name: item.name,
			amount: item.amount,
			price: item.price,
			totalAmount: item.amount * item.price,
		})),

		totalAmount: orderCtx.totalAmount,
	};

	useEffect(() => {
		setPaymentIsValid(
			cardNameIsvalid && cardNumberIsvalid && securityNumberIsvalid
		);
		props.getSubmitOrder(submitOrder);
		props.paymentStatus(paymentIsValid);
	}, [
		paymentIsValid,
		cardNameIsvalid,
		cardNumberIsvalid,
		securityNumberIsvalid,
	]);

	const cardNameValue = (e) => {
		setCardName(e.target.value);
	};

	const cardNumberValue = (e) => {
		setCardNumber(e.target.value);
	};

	const securityNumberValue = (e) => {
		setSecurityNumber(e.target.value);
	};
	const cardNameIsValid = (e) => {
		setCardNameIsValid(e.target.value.trim().length > 0);
	};
	const cardNumberIsValid = (e) => {
		setCardNumberIsValid(e.target.value.trim().length > 0);
	};
	const securityNumberIsValid = (e) => {
		setSecurityNumberIsValid(e.target.value.trim().length > 0);
	};

	return (
		<div className="payment">
			<h2>Payment</h2>

			<form>
				<div className="radioInputs">
					<RadioInput
						className={payment === "newCard" ? "active" : ""}
						htmlFor={"newCard"}
						text={"new card"}
						id={"newCard"}
						value={"newCard"}
						name={"payment"}
						onChange={getRadioInputValue}
					/>
					<RadioInput
						className={payment === "userCard" ? "active" : ""}
						htmlFor={"userCard"}
						text={"user card"}
						id={"userCard"}
						value={"userCard"}
						name={"payment"}
						onChange={getRadioInputValue}
					/>
				</div>

				<div className="cardInputs">
					<LabelInput
						className={cardNameIsvalid === false ? "invalid" : ""}
						alert={
							cardNameIsvalid === false ? "please provide a valid name" : ""
						}
						id={"cardName"}
						type={"text"}
						placeholder={"insert card name"}
						htmlFor={"cardName"}
						label={"Card Name"}
						value={cardName}
						onChange={cardNameValue}
						onBlur={cardNameIsValid}
					/>
					<LabelInput
						className={cardNumberIsvalid === false ? "invalid" : ""}
						alert={
							cardNumberIsvalid === false
								? "please provide a valid card number"
								: ""
						}
						id={"cardNumber"}
						type={"text"}
						placeholder={"insert card number"}
						htmlFor={"cardNumber"}
						label={"Card Number"}
						value={cardNumber}
						onChange={cardNumberValue}
						onBlur={cardNumberIsValid}
					/>
					<LabelInput
						className={securityNumberIsvalid === false ? "invalid" : ""}
						alert={
							securityNumberIsvalid === false
								? "please provide a valid card security number"
								: ""
						}
						id={"securityNumber"}
						type={"text"}
						placeholder={"insert security number"}
						htmlFor={"securityNumber"}
						label={"Security Number"}
						value={securityNumber}
						onChange={securityNumberValue}
						onBlur={securityNumberIsValid}
					/>
				</div>
			</form>
			<section className="submitOrder">
				<h3>Order Details</h3>

				<ul>
					<li>{`Date: ${orderDate.date}`}</li>
					<li>{`Time: ${orderDate.time}`}</li>
					<li>{`Notes: ${addressCtx.deliveryAddress.notes}`}</li>
				</ul>
				<h4>Delivery from:</h4>
				<ul>
					<li>{`Name: ${restaurantCtx.restaurantData[0].name}`}</li>
					<li>{`Address: ${restaurantCtx.restaurantData[0].address}`}</li>
					<li>{`Postcode: ${restaurantCtx.restaurantData[0].postcode.toUpperCase()}`}</li>
					<li>{`City: ${restaurantCtx.restaurantData[0].city}`}</li>
				</ul>
				<h4>Delivery to:</h4>
				<ul>
					<li>{`Name: ${authCtx.userData.firstName} ${authCtx.userData.lastName}`}</li>
					<li>{`Address: ${addressCtx.deliveryAddress[0].address}`}</li>
					<li>{`Postcode: ${addressCtx.deliveryAddress[0].postcode}`}</li>
					<li>{`City: ${addressCtx.deliveryAddress[0].city}`}</li>
				</ul>
				<h4>Order Items:</h4>
				<ul className="orderItems">
					{orderCtx.items.map((item) => (
						<li key={item.id}>
							{<span>{`${item.amount} ${item.name}`}</span>}
							{<span>{`£ ${(item.amount * item.price).toFixed(2)}`}</span>}
						</li>
					))}
					<hr />
					<li>
						<span>Total amount</span>
						<span>{`£ ${orderCtx.totalAmount.toFixed(2)}`}</span>
					</li>
				</ul>
			</section>
		</div>
	);
}
export default Payment;
