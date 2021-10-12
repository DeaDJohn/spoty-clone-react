import React from "react";
import {
	Switch,
	Route
  } from "react-router-dom";
import "./styles/Body.css";
import Header from "./Header";
import { useDataLayerValue } from "./DataLayer";
import Home from "./views/Home";
import Playlist from "./views/Playlist";


function Body({ spotify }) {
	const [{ discover_weekly }, dispatch] = useDataLayerValue();

	return (
		<div className="body">
			<Header spotify={spotify} />
			<Switch>
			<Route exact path="/">
				<Home />
			</Route>
			 <Route exact path="/playlist/:id">
				<Playlist />
			</Route>
			{/*<Route path="/dashboard">
				<Dashboard />
			</Route> */}
			</Switch>
		</div>
	);
}

export default Body;
