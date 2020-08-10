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
    
    state = {
        email: '',
        password: ''
    }

    handleSubmit = event => {
        // 1. Prevent default behavior
        event.preventDefault();

        // 2. Get form data
        console.log(this.state);

        // 3. Handle login logic

        // 4. Go to product page
        this.props.history.push('/');
    };

    handleChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        })
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
					<div className="field">
						<label className="label">Email</label>
						<div className="control">
                            <input 
                            className="input" 
                            type="text" 
                            placeholder="e.g. alexsmith@gmail.com" 
                            name='email'
                            value={this.state.email} 
                            onChange={this.handleChange}/>
						</div>
					</div>

					<div className="field">
						<label className="label">Password</label>
						<div className="control">
							<input
								className="input"
								type="password"
                                placeholder="Password"
                                name='password'
                                value={this.state.password} 
                                onChange={this.handleChange}
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
