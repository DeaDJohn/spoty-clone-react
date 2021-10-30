import React, { useEffect } from "react";
import Login from "./Login";
import "./styles/App.css";
import { getTokenFromUrl } from "./spotify";
import SpotifyWebApi from "spotify-web-api-js";
import Player from "./Player";
import { useDataLayerValue } from "./DataLayer";
import { BrowserRouter as Router} from "react-router-dom";
const spotify = new SpotifyWebApi();

function App() {
	const [{  token }, dispatch] = useDataLayerValue();

	useEffect(() => {
		const hash = getTokenFromUrl();
		window.location.hash = "";
		const _token = hash.access_token;
		if (_token) {
			dispatch({
				type: "SET_TOKEN",
				token: _token,
			});
			// console.log(spotify);
			spotify.setAccessToken(_token);
			spotify.getMe().then((user) => {
				console.log(user);
				dispatch({
					type: "SET_USER",
					user,
				});
			});
			spotify.getUserPlaylists().then((playlists) => {
				dispatch({
					type: "SET_PLAYLISTS",
					playlists,
				});
			});
			spotify.getPlaylist("37i9dQZF1E34Ucml4HHx1w").then((playlist) => {
				dispatch({
					type: "SET_DISCOVER_WEEKLY",
					discover_weekly: playlist,
				});
			});
		}
	}, [dispatch]);

	return (
		<div className="App">
			<Router>
				{token ? <Player spotify={spotify} /> : <Login />}
			</Router>
		</div>
	);
}

export default App;
