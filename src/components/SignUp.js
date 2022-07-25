import { useState } from "react";

import LabelInput from "./Input/LabelInput";
import FullButton from "./Button/FullButton";

function SignUp(props) {
  const [user, setUser] = useState();

  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");

  const [userNameIsvalid, setUserNameIsValid] = useState();
  const [userEmailIsvalid, setUserEmailIsValid] = useState();
  const [userPasswordIsvalid, setUserPasswordIsValid] = useState();

  const [submited, setSubmited] = useState(false);

  const userNameValue = (e) => {
    setUser(false);
    setUserName(e.target.value);
  };

  const userNameIsValid = (e) => {
    setUserNameIsValid(e.target.value.trim().length > 0);
  };

  const userEmailValue = (e) => {
    setUser(false);
    setUserEmail(e.target.value);
  };

  const userEmailIsValid = (e) => {
    setUserEmailIsValid(e.target.value.includes("@"));
  };

  const userPasswordValue = (e) => {
    setUser(false);
    setUserPassword(e.target.value);
  };

  const userPasswordIsValid = (e) => {
    setUserPasswordIsValid(e.target.value.trim().length > 5);
  };

  const signUpHandler = async (e) => {
    e.preventDefault();

    if (userNameIsvalid && userEmailIsvalid && userPasswordIsvalid) {
      const response = await fetch(
        "https://food-togo.herokuapp.com/userByUserName",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            userName: userName,
            password: userPassword,
          }),
        }
      );
      const data = await response.json();
      setUser(data);
      console.log(data);
      if (
        data.success === false &&
        userNameIsvalid &&
        userEmailIsvalid &&
        userPasswordIsvalid
      ) {
        const response = await fetch(
          "https://food-togo.herokuapp.com/userInsertNew",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              userName: userName,
              email: userEmail,
              password: userPassword,
            }),
          }
        );
        const data = await response.json();
        setSubmited(true);
        props.setSubmited("Thanks for submiting");
        console.log(data);
      }

      setUserName("");
      setUserEmail("");
      setUserPassword("");
    }
  };

  return (
    <>
      {!submited && (
        <section className="container">
          <form onSubmit={signUpHandler}>
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
              type={"password"}
              placeholder={"insert password"}
              htmlFor={"userPassword"}
              label={"User password"}
              value={userPassword}
              onChange={userPasswordValue}
              onBlur={userPasswordIsValid}
            />
            {user && <div className="alert">User already exist</div>}

            <FullButton type={"submit"} value={"submit"} text={"Sign up"} />
          </form>
        </section>
      )}
      {submited && (
        <FullButton type={"text"} text={"Login"} onClick={props.onClick} />
      )}
    </>
  );
}

export default SignUp;
