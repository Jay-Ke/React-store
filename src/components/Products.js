import React from "react";
import axios from 'commons/axios';
import ToolBox from "components/ToolBox";
import Product from "components/Product";

class Products extends React.Component {
    state = {
        products: [],
        sourceProducts: []
    }

    componentDidMount() {
        // fetch('http://localhost:3003/products')
        // .then(response => response.json())
        // .then(data => {
        //     this.setState({
        //         products: data
        //     });
        // })
        axios.get('/products')
        .then(response => {
            this.setState({
                products: response.data,
                sourceProducts: response.data
            })
        })
    };

    search = text => {
        console.log(text); 
        // 1. Copy array
        // Need to copy the complete data set but not this.state.products
        let _products = [...this.state.sourceProducts];

        // 2. Filter
        _products = _products.filter(p => {
            // name: 'ABcd' text: 'ab' ==> ['AB]
            const matchArray = p.name.match(new RegExp(text, 'gi'));
            return !!matchArray;
        })

        // 3. Update state
        this.setState({
            products: _products
        });
    };

	render() {
		return (
			<div>
				{/* Product page consist of toolbox componend and product compoenet */}
                {/* Pass search function to child component */}
				<ToolBox search={this.search}/>
				<div className="products">
					<div className="columns is-multiline is-desktop">
						{this.state.products.map((p) => {
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
