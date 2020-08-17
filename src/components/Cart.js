import React, { useState, useEffect } from "react";
import Layout from "Layout";
import CartItem from "components/CartItem";
import axios from "commons/axios";
import { formatPrice } from "commons/helpers";

const Cart = () => {
	const [carts, setCarts] = useState([]);

	useEffect(() => {
		axios.get("/carts").then((res) => {
			setCarts(res.data);
		});
	}, []); // fix infinitely get request issue, pass empty [] is equaivalenet to componenetDidAmount(), only execute once

	const totalPrice = () => {
		const totalPrice = carts
			.map((cart) => cart.mount * parseInt(cart.price))
			.reduce((a, value) => a + value, 0);
		return formatPrice(totalPrice);
	};

	// Update cart item
	// Use to update total price when cart item change
	const updateCart = (cart) => {
		const newCarts = [...carts];
		const _index = newCarts.findIndex((c) => c.id === cart.id);
		newCarts.splice(_index, 1, cart);
		setCarts(newCarts);
	};

	return (
		<Layout>
			<div className="cart-page">
				<span className="cart-title">Shopping Cart</span>
				<div className="cart-list">
					{/* <CartItem />
					<CartItem />
					<CartItem /> */}
					{carts.map((cart) => (
						<CartItem key={cart.id} cart={cart} updateCart={updateCart} />
					))}
				</div>
				<div className="cart-total">
					Total:
					<span className="total-price">{totalPrice()}</span>
				</div>
			</div>
		</Layout>
	);
};

export default Cart;
