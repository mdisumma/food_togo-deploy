import React, { useReducer } from "react";

const OrderContext = React.createContext({
	items: [],
	totalAmount: 0,
	addItem: (item) => {},
	removeItem: (id) => {},
	emptyCart: () => {},
});

const defaultOrderState = {
	items: [],
	totalAmount: 0,
};

const orderReducer = (state, action) => {
	if (action.type === "ADD_ITEM") {
		const updatedTotalAmount =
			state.totalAmount + action.item.price * action.item.amount;
		console.log(updatedTotalAmount);

		const existingCartItemIndex = state.items.findIndex(
			(item) => item.id === action.item.id
		);
		console.log(existingCartItemIndex);
		const existingCartItem = state.items[existingCartItemIndex];
		let updatedItems;

		if (existingCartItem) {
			const updatedItem = {
				...existingCartItem,
				amount: existingCartItem.amount + action.item.amount,
			};
			updatedItems = [...state.items];
			updatedItems[existingCartItemIndex] = updatedItem;
		} else {
			updatedItems = state.items.concat(action.item);
		}

		return {
			items: updatedItems,
			totalAmount: updatedTotalAmount,
		};
	}
	if (action.type === "REMOVE_ITEM") {
		const existingCartItemIndex = state.items.findIndex(
			(item) => item.id === action.id
		);
		console.log(existingCartItemIndex);

		const existingItem = state.items[existingCartItemIndex];
		const updatedTotalAmount = state.totalAmount - existingItem.price;
		console.log(updatedTotalAmount);
		let updatedItems;
		if (existingItem.amount === 1) {
			updatedItems = state.items.filter((item) => item.id !== action.id);
		} else {
			const updatedItem = { ...existingItem, amount: existingItem.amount - 1 };
			updatedItems = [...state.items];
			updatedItems[existingCartItemIndex] = updatedItem;
		}
		return {
			items: updatedItems,
			totalAmount: updatedTotalAmount,
		};
	}
	if (action.type === "EMPTY_CHART") {
		console.log(defaultOrderState);
		return defaultOrderState;
	}
};

export const OrderContexProvider = (props) => {
	const [orderState, orderAction] = useReducer(orderReducer, defaultOrderState);

	const addItemToOrder = (item) => {
		orderAction({ type: "ADD_ITEM", item: item });
	};

	const removeItemFromOrder = (id) => {
		orderAction({ type: "REMOVE_ITEM", id: id });
	};
	const emptyOrder = () => {
		orderAction({ type: "EMPTY_CHART" });
	};

	const orderContext = {
		items: orderState.items,
		totalAmount: orderState.totalAmount,
		addItem: addItemToOrder,
		removeItem: removeItemFromOrder,
		emptyCart: emptyOrder,
	};
	return (
		<OrderContext.Provider value={orderContext}>
			{props.children}
		</OrderContext.Provider>
	);
};

export default OrderContext;
