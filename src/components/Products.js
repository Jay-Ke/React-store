import React from "react";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import axios from "commons/axios";
import ToolBox from "components/ToolBox";
import Product from "components/Product";
import Panel from 'components/Panel';

class Products extends React.Component {
	state = {
		products: [],
		sourceProducts: [],
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
        Panel.open();
    }
	render() {
		return (
			<div>
				{/* Product page consist of toolbox componend and product compoenet */}
				{/* Pass search function to child component */}
				<ToolBox search={this.search} />
				<div className="products">
					<div className="columns is-multiline is-desktop">
                        {/* Set component to null to avoid default div */}
						<TransitionGroup component={null}>
							{this.state.products.map((p) => {
								return (
                                    // Need to set key for a group of elements
                                    // Need to setup CSS in style.css for product-fade-*
									<CSSTransition classNames="product-fade" timeout={300} key={p.id}>
										<div className="column is-3" key={p.id}>
											<Product product={p} />
										</div>
									</CSSTransition>
								);
							})}
						</TransitionGroup>
					</div>
                    <button className="button is-primary add-btn" onClick={this.toAdd}>add</button>
				</div>
			</div>
		);
	}
}

export default Products;
