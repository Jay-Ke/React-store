import React from "react";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import axios from "commons/axios";
import ToolBox from "components/ToolBox";
import Product from "components/Product";
import Panel from "components/Panel";
import AddInventory from "components/AddInventory";

class Products extends React.Component {
	state = {
		products: [],
		sourceProducts: [],
		cartNum: 0,
	};

	componentDidMount() {
		// fetch('http://localhost:3003/products')
		// .then(response => response.json())
		// .then(data => {
		//     this.setState({
		//         products: data
		//     });
		// })
		axios.get("/products").then((response) => {
			this.setState({
				products: response.data,
				sourceProducts: response.data,
			});
		});
		this.updateCartNum();
	}

	search = (text) => {
		console.log(text);
		// 1. Copy array
		// Need to copy the complete data set but not this.state.products
		let _products = [...this.state.sourceProducts];

		// 2. Filter
		_products = _products.filter((p) => {
			// name: 'ABcd' text: 'ab' ==> ['AB]
			const matchArray = p.name.match(new RegExp(text, "gi"));
			return !!matchArray;
		});

		// 3. Update state
		this.setState({
			products: _products,
		});
	};

	toAdd = () => {
		Panel.open({
			component: AddInventory,
			callback: (data) => {
				if (data) {
					this.add(data);
				}
			},
		});
	};

	add = (product) => {
		const _products = [...this.state.products];
		_products.push(product);

		const _sProducts = [...this.state.sourceProducts];
		_sProducts.push(product);

		this.setState({
			products: _products,
			sourceProducts: _sProducts,
		});
	};

	update = (product) => {
		const _products = [...this.state.products];
		const _index = _products.findIndex((p) => p.id === product.id);
		_products.splice(_index, 1, product);
		const _sProducts = [...this.state.sourceProducts];
		const _sIndex = _products.findIndex((p) => p.id === product.id);
		_sProducts.splice(_sIndex, 1, product);
		this.setState({
			products: _products,
			sourceProducts: _sProducts,
		});
	};

	delete = (id) => {
		const _products = this.state.products.filter((p) => p.id !== id);
		const _sProducts = this.state.sourceProducts.filter((p) => p.id !== id);
		this.setState({
			products: _products,
			sourceProducts: _sProducts,
		});
	};

	updateCartNum = async () => {
		const cartNum = await this.initCartNum();
		this.setState({
			cartNum: cartNum,
		});
	};

	initCartNum = async () => {
		const res = await axios.get("/carts");
		const carts = res.data || [];
		const cartNum = carts
			.map((cart) => cart.mount) // [2, 1,2 ]
			.reduce((a, value) => a + value, 0);
		return cartNum;
	};

	render() {
		return (
			<div>
				{/* Product page consist of toolbox componend and product compoenet */}
				{/* Pass search function to child component */}
				<ToolBox search={this.search} cartNum={this.state.cartNum} />
				<div className="products">
					<div className="columns is-multiline is-desktop">
						{/* Set component to null to avoid default div */}
						<TransitionGroup component={null}>
							{this.state.products.map((p) => {
								return (
									// Need to set key for a group of elements
									// Need to setup CSS in style.css for product-fade-*
									<CSSTransition
										classNames="product-fade"
										timeout={300}
										key={p.id}
									>
										<div className="column is-3" key={p.id}>
											<Product
												product={p}
												update={this.update}
												// Pass delete function to Product compoenent
												delete={this.delete}
												updateCartNum={this.updateCartNum}
											/>
										</div>
									</CSSTransition>
								);
							})}
						</TransitionGroup>
					</div>
					<button className="button is-primary add-btn" onClick={this.toAdd}>
						add
					</button>
				</div>
			</div>
		);
	}
}

export default Products;
