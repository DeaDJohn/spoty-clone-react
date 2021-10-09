import React from "react";
import {
	Switch,
	Route
  } from "react-router-dom";
import "./Body.css";
import Header from "./Header";
import { useDataLayerValue } from "./DataLayer";
import Home from "./views/Home";


function Body({ spotify }) {
	const [{ discover_weekly }, dispatch] = useDataLayerValue();

	return (
		<div className="body">
			<Header spotify={spotify} />
			<Switch>
			<Route exact path="/">
				<Home />
			</Route>
			{/* <Route path="/about">
				<About />
			</Route>
			<Route path="/dashboard">
				<Dashboard />
			</Route> */}
			</Switch>
		</div>
	);
}

export default Body;
