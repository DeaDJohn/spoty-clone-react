import React, {Fragment, useState, useEffect} from "react";
import "./styles/Footer.css";
import SpotifyWebApi from "spotify-web-api-js";
import {
	PlayCircleOutline,
	PauseCircleOutline,
	SkipPrevious,
	SkipNext,
	PlaylistPlay,
	Shuffle,
	Repeat,
	VolumeDown,
	VolumeUp,
} from "@material-ui/icons";
import { Grid, Slider } from "@material-ui/core";
import {Link} from 'react-router-dom';
import { useDataLayerValue } from "./DataLayer";

const spotify = new SpotifyWebApi();

function Footer() {

	const [{ token, currentSong, currentVolume}, dispatch] = useDataLayerValue();
	// const [currentSong, setCurrentSong] = useState([]);
	const [statePlay, setStatePlay] = useState(false);
	const [volumen, setVolumen] = useState(0);

	function skipNextSong() {
		spotify.skipToNext().then(() => {
			setTimeout(() =>{
				getCurrentSong();
			},100);
		}
		);
	}
	function skipPrevSong() {
		spotify.skipToPrevious().then(() => {
			setTimeout(() =>{
				getCurrentSong();
			},100);
		});
	}
	function pauseSong(){
		spotify.pause();
		setStatePlay(false);
		getCurrentSong();
	}
	function playSong(){
		spotify.play();
		setStatePlay(true);
		getCurrentSong();
	}

	function getCurrentSong(){
		spotify.getMyCurrentPlayingTrack().then((item) => {
			dispatch({
				type: "SET_CURRENT_SONG",
				currentSong: item
			});
		});
	}
	const setCurrentVolume = (event, newValue) => {
		spotify.setVolume(newValue);
		dispatch({
			type: "SET_CURRENT_VOLUME",
			currentVolume: newValue
		});
	};
	const [playback, setPlayback] = useState([]);
	const playbackUrl = `https://api.spotify.com/v1/me/player?market=ES`;

	useEffect(() => {
		getCurrentSong();
		setCurrentVolume();
		fetch(playbackUrl, {headers: {
			"Accept": "application/json",
			"Content-Type": "application/json",
			"Authorization": `Bearer ${token}`,
			}})
			.then(res => res.json())
			.then(
				(result) => {
				setPlayback(result);
				setStatePlay(result.is_playing)
				setVolumen(result.device.volume_percent);
			},

			(error) => {

			}
			)
	}, []);

	return (
		<footer className="footer">
			{console.log(currentSong)}
			<div className="footer__left">
				{ currentSong &&
					<Fragment>
						<img
							src={currentSong?.item?.album?.images[0].url}
							alt={currentSong?.item?.name}
							className="footer__albumLogo"
						/>
						<div className="footer__songInfo">
							<h4>{currentSong?.item?.name}</h4>
							<p>
							{currentSong?.item?.artists?.map( (artist) => (
									<span className="songTop__artist">
										<Link to={`/Artist/${artist?.id}`}>{artist?.name}</Link>, {" "}
									</span>
								))}
							</p>
						</div>
					</Fragment>
				}
			</div>
			<div className="footer__center">
				<Shuffle className="footer__green" />
				<SkipPrevious className="footer__icon" onClick={skipPrevSong} />
				{!statePlay && <PlayCircleOutline fontSize="large" className="footer__icon" onClick={playSong}/>}
				{statePlay && <PauseCircleOutline fontSize="large" className="footer__icon" onClick={pauseSong}/>}
				<SkipNext className="footer__icon" onClick={skipNextSong}/>
				<Repeat className="footer__green" />
			</div>
			<div className="footer__right">
				<Grid container spacing={2}>
					<Grid item>
						<PlaylistPlay />
					</Grid>
					<Grid item>
						{currentVolume<50 && <VolumeDown />}
						{currentVolume>=50 && <VolumeUp />}
					</Grid>
					<Grid item xs>
						<Slider min={0} max={100} aria-label="Volume" value={currentVolume} onChange={setCurrentVolume}/>
					</Grid>
				</Grid>
			</div>
		</footer>
	);
}

export default Footer;
