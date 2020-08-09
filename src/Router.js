import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import App from "components/App";
import Login from "components/Login";
import NotFound from "components/NotFound";

const Router = () => (
	<BrowserRouter>
		<Switch>
			<Route path="/" exact component={App} />
			<Route path="/login" component={Login} />
			<Route component={NotFound} />
		</Switch>
	</BrowserRouter>
);

export default Router;
