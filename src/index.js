import React from "react";
import ReactDOM from "react-dom/client";
import { AuthContextProvider } from "./components/Store/AuthContext";
import { OrderContexProvider } from "./components/Store/OrderContext";
import { RestaurantContextProvider } from "./components/Store/RestaurantContext";
import { AddressContextProvider } from "./components/Store/AddressContext";
import "./index.css";
import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
	<AuthContextProvider>
		<RestaurantContextProvider>
			<OrderContexProvider>
				<AddressContextProvider>
					<App />
				</AddressContextProvider>
			</OrderContexProvider>
		</RestaurantContextProvider>
	</AuthContextProvider>
);
