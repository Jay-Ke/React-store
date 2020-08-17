import React, { useState, useEffect, useMemo } from "react";
import { CSSTransition, TransitionGroup } from "react-transition-group";
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

	// const totalPrice = () => {
	// 	const totalPrice = carts
	// 		.map((cart) => cart.mount * parseInt(cart.price))
	// 		.reduce((a, value) => a + value, 0);
	// 	return formatPrice(totalPrice);
	// };
	const totalPrice = useMemo(() => {
		const totalPrice = carts
			.map((cart) => cart.mount * parseInt(cart.price))
			.reduce((a, value) => a + value, 0);
		return formatPrice(totalPrice);
	}, [carts]);

	// Update cart item
	// Use to update total price when cart item change
	const updateCart = (cart) => {
		const newCarts = [...carts];
		const _index = newCarts.findIndex((c) => c.id === cart.id);
		newCarts.splice(_index, 1, cart);
		setCarts(newCarts);
	};

	const deleteCart = (cart) => {
		const _carts = carts.filter((c) => c.id !== cart.id);
		setCarts(_carts);
	};

	return (
		<Layout>
			<div className="cart-page">
				<span className="cart-title">Shopping Cart</span>
				<div className="cart-list">
					{/* set to null to avoid empty div */}
					<TransitionGroup component={null}>
						{carts.map((cart) => (
							<CSSTransition classNames="cart-item" timeout={300} key={cart.id}>
								<CartItem
									key={cart.id}
									cart={cart}
									updateCart={updateCart}
									deleteCart={deleteCart}
								/>
							</CSSTransition>
						))}
					</TransitionGroup>
				</div>
				{carts.length === 0 ? <p className="no-cart">NO GOODS</p> : ""}
				<div className="cart-total">
					Total:
					<span className="total-price">{totalPrice}</span>
				</div>
			</div>
		</Layout>
	);
};

export default Cart;
