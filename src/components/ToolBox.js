import React from "react";
// import {Link} from 'react-router-dom';
// import withRouter because only path defined in Router.js can get history
import {withRouter} from 'react-router-dom';

class ToolBox extends React.Component {
    state = {
        searchText: ''
    }

    handleChange = e => {
        const value = e.target.value;
        this.setState({
            searchText: value
        });
        // Use the param passed by parent component
        this.props.search(value);
    }

    clearSearchText = () => {
        this.setState({
            searchText: ''
        });
        // Use the param passed by parent component
        this.props.search('');
    }

    goCart = () => {
        this.props.history.push('/cart');
    }

	render() {
		return (
			<div className="tool-box">
				<div className="logo-text">Store</div>
                <div className="search-box">
                    <div className="field has-addons">
                        <div className="control">
                            <input type="text" 
                            className="input search-input"
                            placeholder="Search Product"
                            value={this.state.searchText}
                            onChange={this.handleChange}
                            />
                        </div>
                        <div className="control">
                            <button className="button" onClick={this.clearSearchText}>X</button>
                        </div>
                    </div>
                </div>
                {/* Can also use <Link to="/cart"></Link> to jump to cart page */}
                <div className="cart-box" onClick={this.goCart}>
                {/* <div to="/cart" className="cart-box" onClick={this.goCart}> */}
                    <i className="fas fa-shopping-cart"></i>
                    <span className="cart-num">({this.props.cartNum})</span>
                </div>
			</div>
		);
	}
}

export default withRouter(ToolBox);
