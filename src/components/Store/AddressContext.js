import React, { useState } from "react";

const AddressContext = React.createContext({
  deliveryCoordinate: [],
  deliveryAddress: [],
  getDeliveryAddress: () => {},
  getDeliveryCoordinate: () => {},
  deleteDeliveryAddress: () => {},
});

export const AddressContextProvider = (props) => {
  const [deliveryAddress, setDeliveryAddress] = useState([]);
  const [deliveryCoordinate, setDeliveryCoordinate] = useState([]);

  const getDeliveryAddressHanler = (data) => {
    setDeliveryAddress(data);
  };

  const getDeliveryCoordinateHanler = (data) => {
    setDeliveryCoordinate(data);
  };

  const deleteDeliveryAddressHandler = () => {
    setDeliveryAddress([]);
  };
  return (
    <AddressContext.Provider
      value={{
        deliveryCoordinate: deliveryCoordinate,
        deliveryAddress: deliveryAddress,
        getDeliveryAddress: getDeliveryAddressHanler,
        getDeliveryCoordinate: getDeliveryCoordinateHanler,
        deleteDeliveryAddress: deleteDeliveryAddressHandler,
      }}
    >
      {props.children}
    </AddressContext.Provider>
  );
};

export default AddressContext;
