import { useState, useEffect, useContext } from "react";
import AuthContext from "../Store/AuthContext";
import AddressContext from "../Store/AddressContext";

import LabelInput from "../Input/LabelInput";
import TextArea from "../Input/TextArea";
import RadioInput from "../Input/RadioInput";
import "./Address.css";

function Address(props) {
	const [addressDetails, setAddressDetails] = useState(false);
	const [name, setName] = useState("");
	const [deliveryAddress, setDeliveryAddress] = useState("");
	const [city, setCity] = useState("");
	const [postcode, setPostcode] = useState("");
	const [deliveryTime, setDeliveryTime] = useState("");
	const [notes, setNotes] = useState("");

	const [deliveryAddressIsvalid, setDeliveryAddressIsValid] = useState();
	const [cityIsvalid, setCityIsValid] = useState();
	const [postcodeIsvalid, setPostcodeIsValid] = useState();
	const [deliveryTimeIsvalid, setDeliveryTimeIsValid] = useState();

	const authCtx = useContext(AuthContext);
	const { userData } = authCtx;

	const addressCtx = useContext(AddressContext);

	const getRadioInputValue = (e) => {
		console.log(e.target.value);

		if (e.target.value === "userAddress") {
			setName(userData.firstName, userData.lastName);
			setDeliveryAddress(userData.address);
			setCity(userData.city);
			setPostcode(userData.postcode);
			setDeliveryTime("soon");
			setDeliveryAddressIsValid(true);
			setCityIsValid(true);
			setPostcodeIsValid(true);
			setDeliveryTimeIsValid(true);
		}
		if (e.target.value === "newAddress") {
			addressCtx.deleteDeliveryAddress();
			setAddressDetails(false);
			setDeliveryAddressIsValid();
			setCityIsValid();
			setPostcodeIsValid();
			setDeliveryTimeIsValid();
			setName("");
			setDeliveryAddress("");
			setCity("");
			setPostcode("");
			setDeliveryTime("");
		}
	};
	useEffect(() => {
		const addressData = {
			userName: name,
			address: deliveryAddress,
			city: city,
			postcode: postcode,
			deliveryTime: deliveryTime,
			notes: notes,
		};
		setAddressDetails(
			deliveryAddressIsvalid &&
				cityIsvalid &&
				postcodeIsvalid &&
				deliveryTimeIsvalid
		);
		console.log(addressDetails);
		props.addressDetails(addressDetails);
		if (addressDetails) {
			addressCtx.getDeliveryAddress([addressData]);
		}
	}, [
		addressDetails,
		name,
		deliveryAddress,
		city,
		postcode,
		deliveryTime,
		notes,
		addressDetails,
	]);

	const deliveryAddressValue = (e) => {
		setDeliveryAddress(e.target.value);
	};
	const cityValue = (e) => {
		setCity(e.target.value);
	};
	const postcodeValue = (e) => {
		setPostcode(e.target.value);
	};
	const deliveryTimeValue = (e) => {
		setDeliveryTime(e.target.value);
	};

	const notesValue = (e) => {
		setNotes(e.target.value);
	};

	const deliveryAddressIsValid = (e) => {
		setDeliveryAddressIsValid(e.target.value.trim().length > 0);
	};

	const cityIsValid = (e) => {
		setCityIsValid(e.target.value.trim(e).length > 0);
	};
	const postcodeIsValid = (e) => {
		setPostcodeIsValid(e.target.value.trim(e).length > 0);
	};

	const deliveryTimeIsValid = (e) => {
		setDeliveryTimeIsValid(e.target.value.trim(e).length > 0);
	};

	return (
		<div className="address">
			<h2>Confirm address</h2>
			<form>
				<div className="radioInputs">
					<RadioInput
						className={addressDetails === "newAddress" ? "active" : ""}
						htmlFor={"newAddress"}
						text={"new address"}
						id={"newAddress"}
						value={"newAddress"}
						name={"addressDetails"}
						onClick={getRadioInputValue}
					/>
					<RadioInput
						className={addressDetails === "userAddress" ? "active" : ""}
						htmlFor={"userAddress"}
						text={"user address"}
						id={"userAddress"}
						value={"userAddress"}
						name={"addressDetails"}
						onClick={getRadioInputValue}
					/>
				</div>

				<LabelInput
					className={deliveryAddressIsvalid === false ? "invalid" : ""}
					alert={
						deliveryAddressIsvalid === false
							? "Please provide a valid address"
							: ""
					}
					id={"deliveryAddress"}
					type={"text"}
					placeholder={"delivery address"}
					htmlFor={"deliveryAddress"}
					label={"Delivery Address"}
					value={deliveryAddress}
					onChange={deliveryAddressValue}
					onBlur={deliveryAddressIsValid}
				/>
				<LabelInput
					className={cityIsvalid === false ? "invalid" : ""}
					alert={cityIsvalid === false ? "Please provide a valid city" : ""}
					id={"city"}
					type={"text"}
					placeholder={"city"}
					htmlFor={"city"}
					label={"City"}
					value={city}
					onChange={cityValue}
					onBlur={cityIsValid}
				/>
				<LabelInput
					className={postcodeIsvalid === false ? "invalid" : ""}
					alert={
						postcodeIsvalid === false ? "Please provide a valid postcode" : ""
					}
					id={"postcode"}
					type={"text"}
					placeholder={"postcode"}
					htmlFor={"postcode"}
					label={"Post code"}
					value={postcode}
					onChange={postcodeValue}
					onBlur={postcodeIsValid}
				/>
				<LabelInput
					className={deliveryTimeIsvalid === false ? "invalid" : ""}
					alert={
						deliveryTimeIsvalid === false
							? "Please provide a valid delivery time"
							: ""
					}
					id={"deliveryTime"}
					type={"text"}
					placeholder={"delivery time"}
					htmlFor={"deliveryTime"}
					label={"Delivery Time"}
					value={deliveryTime}
					onChange={deliveryTimeValue}
					onBlur={deliveryTimeIsValid}
				/>
				<TextArea
					id={"notes"}
					placeholder={"notes"}
					htmlFor={"notes"}
					label={"Notes"}
					value={notes}
					onChange={notesValue}
				/>
			</form>
		</div>
	);
}
export default Address;
