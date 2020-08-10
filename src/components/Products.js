import React from "react";
import ToolBox from "components/ToolBox";
import Product from "components/Product";

class Products extends React.Component {
	render() {
		return (
			<div>
				{/* Product page consist of toolbox componend and product compoenet */}
				<ToolBox />
				<div className="products">
					<div className="columns is-multiline is-desktop">
						<div className="column is-3">
							<Product />
						</div>
                        <div className="column is-3">
							<Product />
						</div>
                        <div className="column is-3">
							<Product />
						</div>
                        <div className="column is-3">
							<Product />
						</div>
                        <div className="column is-3">
							<Product />
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default Products;
