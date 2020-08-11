import React from "react";
import ToolBox from "components/ToolBox";
import Product from "components/Product";

class Products extends React.Component {
	products = [
		{
			id: 1,
			name: "Air Jordan 4",
			image: "images/1.jpg",
			tags: "45 colors",
			price: "59440",
			status: "available",
		},
		{
			id: 2,
			name: "Air Jordan 4",
			image: "images/2.jpg",
			tags: "45 colors",
			price: "59440",
			status: "available",
		},
		{
			id: 3,
			name: "Air Jordan 4",
			image: "images/3.jpg",
			tags: "45 colors",
			price: "59440",
			status: "available",
		},
		{
			id: 4,
			name: "Air Jordan 4",
			image: "images/4.jpg",
			tags: "45 colors",
			price: "59440",
			status: "available",
		},
		{
			id: 5,
			name: "Air Jordan 4",
			image: "images/5.jpg",
			tags: "45 colors",
			price: "59440",
			status: "unavailable",
		},
	];

	render() {
		return (
			<div>
				{/* Product page consist of toolbox componend and product compoenet */}
				<ToolBox />
				<div className="products">
					<div className="columns is-multiline is-desktop">
						{this.products.map((p) => {
							return (
								<div className="column is-3" key={p.id}>
									<Product product={p} />
								</div>
							)
						})}
					</div>
				</div>
			</div>
		);
	}
}

export default Products;
