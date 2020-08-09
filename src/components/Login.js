import React from "react";

// Comment back return compile error?
// import ReactDOM from 'react-dom';

class Login extends React.Component {
	// Javascript arraw function
	// Alternative way: use constructor to bind {this}, this.handleClick = this.handleClick.bind(this)
	// Or use html inline, but not recommended.
	// handleClick = (msg, event) => {
	// 	event.preventDefault();
	// 	console.log(this);
	// 	alert(msg);
	// };

    handleSubmit = event => {
        // 1. Prevent default behavior
        event.preventDefault();

        // 4. go to product page
        this.props.history.push('/');
    };

	render() {
		// JSX Babel Emmet
		return (
			<div className="login-wrapper">
				{/* Note: this.handleClick() will not work */}
				{/* <a href="/login" className="button" onClick={this.handleClick.bind(this, "Click")}>
					Click me
				</a> */}

				<form className="box login-box" onSubmit={this.handleSubmit}>
					<div class="field">
						<label class="label">Name</label>
						<div class="control">
							<input class="input" type="text" placeholder="e.g Alex Smith" />
						</div>
					</div>

					<div class="field">
						<label class="label">Email</label>
						<div class="control">
							<input
								class="input"
								type="email"
								placeholder="e.g. alexsmith@gmail.com"
							/>
						</div>
					</div>
					<div className="control">
						<button className="button is-fullwidth is-primary">Login</button>
					</div>
				</form>
			</div>
		);
	}
}

export default Login;
