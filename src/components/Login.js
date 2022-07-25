import { useState, useEffect, useReducer, useContext } from "react";
import AuthContext from "../components/Store/AuthContext";

import FullButton from "./Button/FullButton";
import LabelInput from "./Input/LabelInput";

const userNameReducer = (state, action) => {
  if (action.type === "USERNAME_INPUT") {
    return { value: action.value, isValid: action.value.trim().length > 0 };
  }
  if (action.type === "INPUT_BLUR") {
    return { value: state.value, isValid: state.value.trim().length > 0 };
  }
  return { value: "", isValid: false };
};

const userPasswordReducer = (state, action) => {
  if (action.type === "USERPASSWORD_INPUT") {
    return { value: action.value, isValid: action.value.trim().length > 5 };
  }
  if (action.type === "INPUT_BLUR") {
    return { value: state.value, isValid: state.value.trim().length > 5 };
  }
  return { value: "", isValid: false };
};

const updateUserNameReducer = (state, action) => {
  if (action.type === "UPDATE_USERNAME_INPUT") {
    return {
      value: action.value,
      isValid: action.value.trim().length > 0 || "",
    };
  }
  if (action.type === "UPDATE_INPUT_BLUR") {
    return {
      value: state.value,
      isValid: state.value.trim().length > 0,
    };
  }
  return { value: "", isValid: false };
};

const updateUserPasswordReducer = (state, action) => {
  if (action.type === "UPDATE_USERPASSWORD_INPUT") {
    return {
      value: action.value,
      isValid: action.value.trim().length > 5 || "",
    };
  }
  if (action.type === "UPDATE_INPUT_BLUR") {
    return {
      value: state.value,
      isValid: state.value.trim().length > 5,
    };
  }
  return { value: "", isValid: false };
};

function Login(props) {
  const [user, setUser] = useState();
  const [updatePassword, setUpdatePassword] = useState(false);
  const [updateUserName, setUpdateUserName] = useState();
  const authCtx = useContext(AuthContext);

  const [authFormIsValid, setAuthFormIsValid] = useState(false);
  const [updateFormIsValid, setUpdateFormIsValid] = useState(false);

  const [userNameState, userNameAction] = useReducer(userNameReducer, {
    value: "",
    isValid: null,
  });

  const [userPasswordState, userPasswordAction] = useReducer(
    userPasswordReducer,
    {
      value: "",
      isValid: null,
    }
  );

  const [updateUserNameState, updateUserNameAction] = useReducer(
    updateUserNameReducer,
    {
      value: "",
      isValid: null,
    }
  );

  const [updatePasswordState, updatePasswordAction] = useReducer(
    updateUserPasswordReducer,
    {
      value: "",
      isValid: null,
    }
  );

  const userNameValue = (e) => {
    setUser();
    userNameAction({ type: "USERNAME_INPUT", value: e.target.value });
  };
  const userPasswordValue = (e) => {
    setUser();
    userPasswordAction({ type: "USERPASSWORD_INPUT", value: e.target.value });
  };

  const userNameIsValid = () => {
    userNameAction({ type: "INPUT_BLUR" });
  };

  const userPasswordIsValid = () => {
    userPasswordAction({ type: "INPUT_BLUR" });
  };

  const updateUserNameValue = (e) => {
    setUser();
    setUpdateUserName(true);
    updateUserNameAction({
      type: "UPDATE_USERNAME_INPUT",
      value: e.target.value,
    });
  };
  const updateUserPasswordValue = (e) => {
    setUser();

    updatePasswordAction({
      type: "UPDATE_USERPASSWORD_INPUT",
      value: e.target.value,
    });
  };

  const updateUserNameIsValid = () => {
    updateUserNameAction({ type: "UPDATE_INPUT_BLUR" });
  };

  const updateUserPasswordIsValid = () => {
    updatePasswordAction({ type: "UPDATE_INPUT_BLUR" });
  };

  const clearUpdateFormValue = (e) => {
    updateUserNameAction({
      type: "UPDATE_USERNAME_INPUT",
      value: "",
    });
    updatePasswordAction({
      type: "UPDATE_USERPASSWORD_INPUT",
      value: "",
    });
  };

  const { isValid: nameIsValid } = userNameState;
  const { isValid: passwordIsValid } = userPasswordState;

  const { isValid: updateNameIsValid } = updateUserNameState;
  const { isValid: updatePasswordIsValid } = updatePasswordState;

  useEffect(() => {
    console.log(updateUserName);
    setAuthFormIsValid(nameIsValid && passwordIsValid);
    setUpdateFormIsValid(updateNameIsValid && updatePasswordIsValid);
  }, [
    nameIsValid,
    passwordIsValid,
    updateNameIsValid,
    updatePasswordIsValid,
    updateUserName,
  ]);

  const logInHandler = async (e) => {
    e.preventDefault();
    if (authFormIsValid) {
      try {
        const response = await fetch("https://food-togo.herokuapp.com/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            userName: userNameState.value,
            password: userPasswordState.value,
          }),
        });
        const data = await response.json();
        console.log(data);

        if (data.success === false) {
          setUser(false);
          console.log("user doesn't exist");
        } else {
          setUser(true);
          authCtx.onLogIn(data.userName);
          authCtx.getUserData(data);
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  const updatePasswordHandler = async (e) => {
    e.preventDefault();
    if (updateFormIsValid && updateNameIsValid && updatePasswordIsValid) {
      const response = await fetch(
        "https://food-togo.herokuapp.com/userByUserName",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            userName: updateUserNameState.value,
          }),
        }
      );
      const data = await response.json();
      setUser(data);
      console.log(data);
      if (data.success === false) {
        setUpdateUserName(false);
        return;
      }
      if (data.userName) {
        setUpdateUserName(true);
        const response = await fetch(
          `https://food-togo.herokuapp.com/updateUserById/${data.id}`,
          {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              userName: data.userName,
              email: data.email,
              password: updatePasswordState.value,
            }),
          }
        );
        const updated = await response.json();
        console.log(updated);
        setUpdatePassword(false);
      }
    }
    clearUpdateFormValue();
    props.setSubmited("Update successful");
  };

  function toggleResetForm() {
    setUpdatePassword(!updatePassword);
    props.setSubmited("Login");
  }

  return (
    <>
      <section className="container">
        <form onSubmit={logInHandler}>
          <LabelInput
            className={userNameState.isValid === false ? "invalid" : ""}
            alert={
              userNameState.isValid === false
                ? "Please provide a valid user name"
                : ""
            }
            id={"userName"}
            type={"text"}
            placeholder={"insert username"}
            htmlFor={"userName"}
            label={"User name"}
            value={userNameState.value}
            onChange={userNameValue}
            onBlur={userNameIsValid}
          />
          <LabelInput
            className={userPasswordState.isValid === false ? "invalid" : ""}
            alert={
              userPasswordState.isValid === false
                ? "Plesae provide minimum 6 character"
                : ""
            }
            id={"userPassword"}
            type={"password"}
            placeholder={"insert password"}
            htmlFor={"userPassword"}
            label={"User password"}
            value={userPasswordState.value}
            onChange={userPasswordValue}
            onBlur={userPasswordIsValid}
          />

          {user === false && <div className="alert">User does not exist</div>}

          <FullButton type={"submit"} value={"submit"} text={"Login"} />
        </form>

        <button className="resetPassword" onClick={toggleResetForm}>
          Reset your password
        </button>
        {updatePassword && (
          <form onSubmit={updatePasswordHandler}>
            <LabelInput
              className={updateUserNameState.isValid === false ? "invalid" : ""}
              alert={
                updateUserNameState.isValid === false
                  ? "Please provide a valid user name"
                  : ""
              }
              id={"updateUsername"}
              type={"text"}
              placeholder={"insert username"}
              htmlFor={"updateUsername"}
              label={"User name"}
              value={updateUserNameState.value}
              onChange={updateUserNameValue}
              onBlur={updateUserNameIsValid}
            />
            <LabelInput
              className={updatePasswordState.isValid === false ? "invalid" : ""}
              alert={
                updatePasswordState.isValid === false
                  ? "Plesae provide minimum 6 character"
                  : ""
              }
              id={"updateUserPassword"}
              type={"password"}
              placeholder={"insert password"}
              htmlFor={"updateUserPassword"}
              label={"New password"}
              value={updatePasswordState.value}
              onChange={updateUserPasswordValue}
              onBlur={updateUserPasswordIsValid}
            />

            {updateUserName === false && (
              <div className="alert">User does not exist</div>
            )}

            <FullButton
              type={"submit"}
              value={"submit"}
              text={"update password"}
            />
          </form>
        )}
      </section>
    </>
  );
}

export default Login;
