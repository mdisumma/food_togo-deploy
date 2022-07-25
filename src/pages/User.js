import { useEffect, useState, useContext } from "react";
import RestaurantContext from "../components/Store/RestaurantContext";
import OrderContext from "../components/Store/OrderContext";
import AddressContext from "../components/Store/AddressContext";
import AuthContext from "../components/Store/AuthContext";
import UserNav from "../components/Nav/UserNav";
import CartButton from "../components/Button/CartButton";
import MenuButton from "../components/Button/MenuButton";
import BackButton from "../components/Button/BackButton";
import PageTitle from "../components/PageTitle/PageTitle";
import FindRestaurant from "../components/OrderFood/Restaurants/FindRestaurant";
import FoodCategorie from "../components/OrderFood/Menu/MenuList";
import Cart from "../components/OrderFood/Cart/Cart";
import Address from "../components/OrderFood/Address";
import Payment from "../components/OrderFood/Payment";
import FullButton from "../components/Button/FullButton";
import UserDetails from "../components/OrderFood/UserDetails";
import Delivery from "../components/OrderFood/Delivery";

function User() {
  const [submitOrder, setSubmitOrder] = useState();
  const [account, setAccount] = useState(false);
  const [restaurants, setRestaurants] = useState(true);
  const [delivery, setDelivery] = useState(false);
  const [menu, setMenu] = useState(false);
  const [cart, setCart] = useState(false);
  const [address, setAddress] = useState(false);
  const [payment, setPayment] = useState(false);
  const [paymentChecked, setPaymentChecked] = useState(false);
  const [pageTitle, setPageTitle] = useState("");
  const [text, setText] = useState("");
  //Navigation
  const [accountActive, setAccountActive] = useState(false);
  const [orderActive, setOrderActive] = useState(true);
  const [deliveryActive, setDeliveryActive] = useState(false);
  const [userName, setUserName] = useState();
  // AuthContext
  const authCtx = useContext(AuthContext);

  //RestaurantContext
  const restaurantCtx = useContext(RestaurantContext);
  const { restaurantData } = restaurantCtx;

  //OrderContext
  const orderCtx = useContext(OrderContext);
  //Submit Context
  const addressCtx = useContext(AddressContext);

  function getSubmitOrder(data) {
    console.log(data);
    setSubmitOrder(data);
  }

  function paymentStatus(data) {
    console.log(data);
    setPaymentChecked(data);
  }

  function addressDetails(data) {
    console.log(data);
    if (data === true) {
      setText("confirm address");
    }
    if (data === false) {
      setText("insert address");
    }
  }

  async function submitOrderHandler() {
    const response = await fetch(
      "https://food-togo.herokuapp.com/orderRouter",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(submitOrder),
      }
    );
    const data = await response.json();
    console.log(data);
  }

  // reset value default
  const resetState = () => {
    setPageTitle("");
    setText("");
    setRestaurants(false);
    setMenu(false);
    setCart(false);
    setMenu(false);
    setAddress(false);
    setPayment(false);
  };

  //Menu button (burgher menu)

  function accountActiveHandler() {
    setAccountActive(true);
    setOrderActive(false);
    setDeliveryActive(false);
    setAccount(true);
    setDelivery(false);
    setRestaurants(false);
  }

  function orderActiveHandler() {
    setOrderActive(true);
    setAccountActive(false);
    setDeliveryActive(false);
    setRestaurants(true);
    setDelivery(false);
    setAccount(false);
  }

  function deliveryActiveHandler() {
    setDeliveryActive(true);
    setOrderActive(false);
    setAccountActive(false);
    setDelivery(true);
    setAccount(false);
    setRestaurants(false);
  }

  const fetchUsersHandler = async () => {
    try {
      const response = await fetch(
        "https://food-togo.herokuapp.com/userByUserName",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            userName: userName,
          }),
        }
      );
      const data = await response.json();
      authCtx.getUserData(data);
    } catch (error) {
      console.log(error);
    }
  };
  //dispalay restaurants (find restaurant)
  useEffect(() => {
    setUserName(localStorage.getItem("userName"));
    fetchUsersHandler();
    if (account) {
      setPageTitle("Account");
      setRestaurants(false);
    }
    if (delivery) {
      setPageTitle("Delivery");
      setRestaurants(false);
    }

    if (!account && !delivery) {
      if (restaurantData.length === 0) {
        setPageTitle("Order");
        setRestaurants(true);
        setMenu(false);
      }
      if (restaurantData.length === 0 && orderCtx.items.length > 0) {
        setPageTitle("Order");
        orderCtx.emptyCart();
        setRestaurants(true);
        setMenu(false);
      }
      //dispalay Menu (menu list)
      if (restaurantData.length === 1 && orderCtx.items.length === 0) {
        resetState();
        setRestaurants(false);
        setPageTitle("Menu list");
        setMenu(true);
        setCart(false);
        setText("cart is empty");
      }
      if (restaurantData.length === 1 && orderCtx.items.length > 0) {
        setRestaurants(false);
        setPageTitle("Menu list");
        setText("confirm order");
      }
    }
    // if (!paymentChecked) {
    //   setText("insert payment");
    // }
    if (paymentChecked) {
      setText("submit payment");
    }
  }, [
    paymentChecked,
    userName,
    account,
    delivery,
    restaurantCtx,
    restaurantData.length,
    orderCtx,
  ]);

  //submit Button (Footer)
  function submitButton() {
    // display menu (menu list) => (order list)
    if (menu) {
      if (restaurantData.length === 1 && orderCtx.items.length === 0) {
        setText("cart is empty");
      }
      if (restaurantData.length === 1 && orderCtx.items.length > 0) {
        resetState();
        setPageTitle("Order list");
        setText("confirm order");
        setCart(true);
      }
    }
    // display cart (Confirm order) => (Confirm address)
    if (cart) {
      if (restaurantData.length === 1 && orderCtx.items.length === 0) {
        setText("cart is empty");
      }
      if (restaurantData.length === 1 && orderCtx.items.length > 0) {
        resetState();
        setPageTitle("Address details");
        setText("insert address");
        setAddress(true);
      }
    }
    // display address (Confirm Address) => (Confirm payment)
    if (address && addressCtx.deliveryAddress.length === 0) {
      console.log(addressCtx.deliveryAddress);
      console.log(addressCtx.deliveryAddress.length);
    }
    if (address && addressCtx.deliveryAddress.length > 0) {
      resetState();
      setPageTitle("Payment method");
      setText("insert payment");
      setPayment(true);
      console.log(addressCtx.deliveryAddress);
      console.log(addressCtx.deliveryAddress.length);
    }
    if (payment && paymentChecked) {
      console.log(payment);
      console.log(paymentChecked);
      submitOrderHandler();
      setPayment(false);
      setDelivery(true);
      deliveryActiveHandler();
      restaurantCtx.removeRestaurantData();
    }
  }

  //cart Button (Header)
  function cartButton() {
    if (restaurantData.length === 0) {
      resetState();
      setPageTitle("Cart is empty");
      setText("cart is empty");
      setCart(true);
    }
    if (restaurantData.length === 1 && orderCtx.items.length === 0) {
      resetState();
      setPageTitle("Cart is empty");
      setText("cart is empty");
      setCart(true);
    }
    if (restaurantData.length === 1 && orderCtx.items.length > 0) {
      resetState();
      setPageTitle("Order list");
      setText("confirm order");
      setCart(true);
    }
  }
  // arrow Button (Header)
  function backButton() {
    if (menu) {
      if (restaurantData.length === 1 && orderCtx.items.length === 0) {
        setPageTitle("Order");
        setRestaurants(true);
        setMenu(false);
        restaurantCtx.removeRestaurantData();
      }
      if (restaurantData.length === 1 && orderCtx.items.length > 0) {
        setPageTitle("Menu list");
        setMenu(false);
        restaurantCtx.removeRestaurantData();
      }
    } else if (cart) {
      if (restaurantData.length === 1 && orderCtx.items.length > 0) {
        resetState();
        setPageTitle("Menu list");
        setText("confirm order");
        setMenu(true);
      }
      if (restaurantData.length === 1 && orderCtx.items.length === 0) {
        resetState();
        setPageTitle("Order");
        setRestaurants(true);
      }
      if (restaurantData.length === 0) {
        resetState();
        setPageTitle("Order");
        setRestaurants(true);
      }
    } else if (address) {
      resetState();
      setPageTitle("Order details");
      setText("confirm order");
      setCart(true);
    } else if (payment) {
      resetState();
      setPageTitle("Address details");
      setText("confirm address");
      setAddress(true);
      addressCtx.deleteDeliveryAddress();
    }
  }
  return (
    <>
      <header>
        <UserNav
          iconLeft={
            restaurants || account || delivery ? (
              <MenuButton
                onAccount={accountActiveHandler}
                onOrder={orderActiveHandler}
                onDelivery={deliveryActiveHandler}
                accountActive={accountActive}
                orderActive={orderActive}
                deliveryActive={deliveryActive}
              />
            ) : (
              <BackButton onClick={backButton} />
            )
          }
          iconRight={
            restaurants || account || delivery ? (
              ""
            ) : (
              <CartButton onClick={cartButton} />
            )
          }
        />
      </header>

      <PageTitle title={pageTitle} />
      <div className="container">
        {account && <UserDetails />}
        {delivery && <Delivery />}
        {restaurants && <FindRestaurant />}
        {menu && <FoodCategorie />}
        {cart && <Cart />}
        {address && <Address addressDetails={addressDetails} />}
        {payment && (
          <Payment
            getSubmitOrder={getSubmitOrder}
            paymentStatus={paymentStatus}
          />
        )}
      </div>
      {!restaurants && !account && !delivery && (
        <footer>
          <FullButton text={text} onClick={submitButton} />
        </footer>
      )}
    </>
  );
}
export default User;
