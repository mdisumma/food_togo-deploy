import { useState, useEffect, useContext } from "react";
import AuthContext from "../Store/AuthContext";
import FullButton from "../Button/FullButton";
import LabelInput from "../Input/LabelInput";

import "./UserDetails.css";
function UserDetails() {
  const [toggleUpdateUser, setToggleUpdateUser] = useState();
  const [toggleUpdateAddress, setToggleUpdateAddress] = useState();

  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");

  const [userNameIsvalid, setUserNameIsValid] = useState();
  const [userEmailIsvalid, setUserEmailIsValid] = useState();
  const [userPasswordIsvalid, setUserPasswordIsValid] = useState();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [postcode, setPostcode] = useState("");

  const [firstNameIsvalid, setFirstNameIsValid] = useState();
  const [lastNameIsvalid, setLastNameIsValid] = useState();
  const [addressIsvalid, setAddressIsValid] = useState();
  const [cityIsvalid, setCityIsValid] = useState();
  const [postcodeIsvalid, setPostcodeIsValid] = useState();
  const [localStore, setLocalStore] = useState();

  const [cardName, setCardName] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [securityNumber, setSecurityNumber] = useState("");

  const [cardNameIsvalid, setCardNameIsValid] = useState();
  const [cardNumberIsvalid, setCardNumberIsValid] = useState();

  const authCtx = useContext(AuthContext);

  const { userData } = authCtx;

  function toggleUserDetailsForm() {
    setToggleUpdateUser(!toggleUpdateUser);
  }
  function toggleAddressDetailsForm() {
    setToggleUpdateAddress(!toggleUpdateAddress);
  }
  //Update user details
  const userNameValue = (e) => {
    setUserName(e.target.value);
  };

  const userNameIsValid = (e) => {
    setUserNameIsValid(e.target.value.trim().length > 0);
  };

  const userEmailValue = (e) => {
    setUserEmail(e.target.value);
  };

  const userEmailIsValid = (e) => {
    setUserEmailIsValid(e.target.value.includes("@"));
  };

  const userPasswordValue = (e) => {
    setUserPassword(e.target.value);
  };

  const userPasswordIsValid = (e) => {
    setUserPasswordIsValid(e.target.value.trim().length > 5);
  };

  const firstNameValue = (e) => {
    setFirstName(e.target.value);
  };
  const lastNameValue = (e) => {
    setLastName(e.target.value);
  };
  const addressValue = (e) => {
    setAddress(e.target.value);
  };
  const cityValue = (e) => {
    setCity(e.target.value);
  };
  const postcodeValue = (e) => {
    setPostcode(e.target.value.toUpperCase());
  };

  const firstNameIsValid = (e) => {
    setFirstNameIsValid(e.target.value.trim().length > 0);
  };
  const lastNameIsValid = (e) => {
    setLastNameIsValid(e.target.value.trim().length > 0);
  };

  const addressIsValid = (e) => {
    setAddressIsValid(e.target.value.trim().length > 0);
  };

  const cityIsValid = (e) => {
    setCityIsValid(e.target.value.trim(e).length > 0);
  };
  const postcodeIsValid = (e) => {
    setPostcodeIsValid(e.target.value.trim(e).length > 0);
  };

  const cardNameValue = (e) => {
    setCardName(e.target.value);
  };
  const cardNumberValue = (e) => {
    setCardNumber(e.target.value);
  };

  const cardNameIsValid = (e) => {
    setCardNameIsValid(e.target.value.trim().length > 0);
  };
  const cardNumberIsValid = (e) => {
    setCardNumberIsValid(e.target.value.trim().length > 0);
  };

  //Update user data
  const fetchUsersHandler = async () => {
    setLocalStore(localStorage.getItem("userName"));
    try {
      const response = await fetch(
        "https://food-togo.herokuapp.com/userByUserName",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            userName: localStore,
          }),
        }
      );
      const data = await response.json();

      authCtx.getUserData(data);
    } catch (error) {
      console.log(error);
    }
  };

  //Update user details
  const updateUserDataHandler = async (e) => {
    e.preventDefault();

    try {
      // const response =
      await fetch(
        `https://food-togo.herokuapp.com/updateUserById/${userData.id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            userName: userName,
            email: userEmail,
            password: userPassword,
          }),
        }
      );
      // const data = await response.json();
      setUserName("");
      setUserEmail("");
      setUserPassword("");
      setToggleUpdateUser(false);
      authCtx.onLogIn(userName);
    } catch (error) {
      console.log(error);
    }
  };

  //update user address
  const updateUsersAddressHandler = async (e) => {
    e.preventDefault();
    try {
      // const response =
      await fetch(
        `https://food-togo.herokuapp.com/updateUserById/${userData.id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            firstName: firstName,
            lastName: lastName,
            address: address,
            city: city,
            postcode: postcode,
          }),
        }
      );
      // const data = await response.json();
      setFirstName("");
      setLastName("");
      setAddress("");
      setCity("");
      setPostcode("");
      setToggleUpdateAddress(false);
    } catch (error) {
      console.log(error);
    }
  };

  //Update card details
  const updateUserCardHandler = async (e) => {
    e.preventDefault();

    try {
      // const response =
      await fetch(
        `https://food-togo.herokuapp.com/updateUserById/${userData.id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            cardName: cardName,
            cardNumber: cardNumber,
          }),
        }
      );
      // const data = await response.json();
      setCardName("");
      setCardNumber("");
      setSecurityNumber("");
      setToggleUpdateUser(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    setLocalStore(localStorage.getItem("userName"));
    if (localStore) fetchUsersHandler();
  }, [
    localStore,
    userEmail,
    userPassword,
    firstName,
    lastName,
    address,
    postcode,
    city,
    cardName,
    cardNumber,
    securityNumber,
  ]);

  return (
    <>
      <div className="userDetails">
        <h2>User Information</h2>
        <ul>
          <h4>User details</h4>
          <li>{`Username: ${authCtx.userData.userName}`}</li>
          <li>{`Email: ${authCtx.userData.email}`}</li>
          <li>{`Password: ${authCtx.userData.password}`}</li>
        </ul>
        <button
          className={toggleUpdateUser ? "update active" : "update"}
          onClick={toggleUserDetailsForm}
        >
          Update user details
        </button>
        {toggleUpdateUser && (
          <form onSubmit={updateUserDataHandler}>
            <LabelInput
              className={userNameIsvalid === false ? "invalid" : ""}
              alert={
                userNameIsvalid === false ? "Please provide user name" : ""
              }
              id={"userName"}
              type={"text"}
              placeholder={"insert username"}
              htmlFor={"userName"}
              label={"User name"}
              value={userName}
              onChange={userNameValue}
              onBlur={userNameIsValid}
            />
            <LabelInput
              className={userEmailIsvalid === false ? "invalid" : ""}
              alert={
                userEmailIsvalid === false ? "Please provide a valid email" : ""
              }
              id={"userEmail"}
              type={"text"}
              placeholder={"insert email"}
              htmlFor={"userEmail"}
              label={"User email"}
              value={userEmail}
              onChange={userEmailValue}
              onBlur={userEmailIsValid}
            />
            <LabelInput
              className={userPasswordIsvalid === false ? "invalid" : ""}
              alert={
                userPasswordIsvalid === false
                  ? "Please provide min 6 characters password"
                  : ""
              }
              id={"userPassword"}
              type={"text"}
              placeholder={"insert password"}
              htmlFor={"userPassword"}
              label={"User password"}
              value={userPassword}
              onChange={userPasswordValue}
              onBlur={userPasswordIsValid}
            />
            <FullButton type={"submit"} value={"submit"} text={"update"} />
          </form>
        )}
      </div>
      <div className="userDetails">
        <h2>Address details</h2>
        <ul>
          <h4>Address details</h4>
          <li>{`Name: ${authCtx.userData.firstName}  ${authCtx.userData.lastName}`}</li>
          <li>{`Address: ${authCtx.userData.address}`}</li>
          <li>{`Postcode: ${authCtx.userData.postcode}`}</li>
          <li>{`City: ${authCtx.userData.city}`}</li>
        </ul>

        <button
          className={toggleUpdateAddress ? "update active" : "update"}
          onClick={toggleAddressDetailsForm}
        >
          Update address details
        </button>
        {toggleUpdateAddress && (
          <form onSubmit={updateUsersAddressHandler}>
            <LabelInput
              className={firstNameIsvalid === false ? "invalid" : ""}
              alert={
                firstNameIsvalid === false ? "Please provide a first name" : ""
              }
              id={"firstNameame"}
              type={"text"}
              placeholder={"insert first name"}
              htmlFor={"firstName"}
              label={"Firs name"}
              value={firstName}
              onChange={firstNameValue}
              onBlur={firstNameIsValid}
            />
            <LabelInput
              className={lastNameIsvalid === false ? "invalid" : ""}
              alert={
                lastNameIsvalid === false ? "Please provide a last name" : ""
              }
              id={"lastName"}
              type={"text"}
              placeholder={"insert last name"}
              htmlFor={"lastName"}
              label={"Last name"}
              value={lastName}
              onChange={lastNameValue}
              onBlur={lastNameIsValid}
            />
            <LabelInput
              className={addressIsvalid === false ? "invalid" : ""}
              alert={
                addressIsvalid === false ? "Please provide an address" : ""
              }
              id={"address"}
              type={"text"}
              placeholder={"address"}
              htmlFor={"address"}
              label={"Address"}
              value={address}
              onChange={addressValue}
              onBlur={addressIsValid}
            />
            <LabelInput
              className={postcodeIsvalid === false ? "invalid" : ""}
              alert={
                postcodeIsvalid === false ? "Please provide a postcode" : ""
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
              className={cityIsvalid === false ? "invalid" : ""}
              alert={cityIsvalid === false ? "Please provide a city" : ""}
              id={"city"}
              type={"text"}
              placeholder={"city"}
              htmlFor={"city"}
              label={"City"}
              value={city}
              onChange={cityValue}
              onBlur={cityIsValid}
            />

            <FullButton
              type={"submit"}
              value={"submit"}
              text={"update address"}
            />
          </form>
        )}
      </div>
      <div className="userDetails">
        <h2>Payment details</h2>
        <ul>
          <h4>Card details</h4>
          <li>{`Card name: ${authCtx.userData.cardName}`}</li>
          <li>{`Card number: ${authCtx.userData.cardNumber}`}</li>
        </ul>
        <button
          className={toggleUpdateUser ? "update active" : "update"}
          onClick={toggleUserDetailsForm}
        >
          Update card details
        </button>
        {toggleUpdateUser && (
          <form onSubmit={updateUserCardHandler}>
            <LabelInput
              className={cardNameIsvalid === false ? "invalid" : ""}
              alert={
                cardNameIsvalid === false
                  ? "Please provide a card holder name"
                  : ""
              }
              id={"cardName"}
              type={"text"}
              placeholder={"insert card name"}
              htmlFor={"cardName"}
              label={"Card name"}
              value={cardName}
              onChange={cardNameValue}
              onBlur={cardNameIsValid}
            />
            <LabelInput
              className={cardNumberIsvalid === false ? "invalid" : ""}
              alert={
                cardNumberIsvalid === false
                  ? "Please provide a valid number"
                  : ""
              }
              id={"cardNumber"}
              type={"text"}
              placeholder={"insert card number"}
              htmlFor={"cardNumber"}
              label={"Card number"}
              value={cardNumber}
              onChange={cardNumberValue}
              onBlur={cardNumberIsValid}
            />
            <FullButton type={"submit"} value={"submit"} text={"update"} />
          </form>
        )}
      </div>
    </>
  );
}
export default UserDetails;
