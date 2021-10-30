import React from "react";
import {
	Switch,
	Route
  } from "react-router-dom";
import "./styles/Body.css";
import Header from "./Header";
import Home from "./views/Home";
import Playlist from "./views/Playlist";
import Album from "./views/Album";
import Artist from "./views/Artist";


function Body({ spotify }) {

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
			<Route exact path="/artist/:id">
				<Artist />
			</Route>
			<Route exact path="/album/:id">
				<Album />
			</Route>
			{/*<Route path="/dashboard">
				<Dashboard />
			</Route> */}
			</Switch>
		</div>
	);
}

export default Body;
