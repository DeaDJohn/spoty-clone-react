import React, {useState,useEffect} from 'react';
import { useDataLayerValue } from "../DataLayer";
import { PlayCircleFilled, Favorite, MoreHoriz } from "@material-ui/icons";
import SongRow from "../SongRow";
import AlbumItem from '../items/AlbumItem';

function Home() {
	const [{ token, playlists, user }, dispatch] = useDataLayerValue();
	const [error, setError] = useState(null);
	const [artists, setArtists] = useState([]);
	const artistsUrl = `https://api.spotify.com/v1/me/top/artists?time_range=medium_term&limit=10&offset=5`;
	const [tracks, setTracks] = useState([]);
	const tracksUrl = `https://api.spotify.com/v1/me/top/tracks?time_range=medium_term&limit=10&offset=5`;
	console.log(user);
	useEffect(() => {

		fetch(artistsUrl, {headers: {
			"Accept": "application/json",
			"Content-Type": "application/json",
			"Authorization": `Bearer ${token}`,
		}})
		.then(res => res.json())
		.then(
			(result) => {
			// console.log(result);
			setArtists(result);
		},
		// Nota: es importante manejar errores aquí y no en
		// un bloque catch() para que no interceptemos errores
		// de errores reales en los componentes.
		(error) => {
			setError(error);
		}
		);
		fetch(tracksUrl, {headers: {
			"Accept": "application/json",
			"Content-Type": "application/json",
			"Authorization": `Bearer ${token}`,
		}})
		.then(res => res.json())
		.then(
			(result) => {
			// console.log(result);
			setTracks(result);
		},
		// Nota: es importante manejar errores aquí y no en
		// un bloque catch() para que no interceptemos errores
		// de errores reales en los componentes.
		(error) => {
			setError(error);
		}
		)
		console.log(error);
	}, [])
	return (
	  <div className="home">
		  <div className="body__info" style={{marginBottom: '75px'}}>
			{<img src={user?.images[0]?.url} alt={user?.display_name} width={user?.images[0]?.width + 'px'} height={user?.images[0]?.height + 'px'} /> }
			<div className="body__infoText">
				<strong>user</strong>
				{ <h2>{user?.display_name}</h2>}
			</div>
		</div>
		<div className="body__songs">
			<div className="section-topSong" aria-label="Álbumes">
				<div className="section-topSong_header">
					<h2 className="section-topSong_title" as="h2">Tus canciones favoritas</h2>
				</div>
				<div className="section-topSong_grid">
					{Object.keys(tracks).length > 0 && tracks?.items.map((item, index) => (
						<div className="songTop">
							<div className="songTop_row">
								<div className="songTop_position">
									<span>{index}</span>
								</div>
								<div className="songTop_information">
									<img src={item?.album.images[0].url} alt="" className="songTop__album" />
									<div className="songTop__info">
										<p>{item?.name}</p>
									</div>
								</div>
								<div className="songTop_reproduction">
								</div>
								<div className="songTop_time">
								</div>
							</div>
						</div>
					))}
				</div>
			</div>
			<div className="section-albums" aria-label="Artists">
				<div className="section-albums_header">
					<h2 className="section-albums_title" as="h2">Tus Artistas favoritos</h2>
				</div>
				<div className="section-albums_grid">
					{Object.keys(artists).length > 0 && artists?.items.map((item) => (
						<AlbumItem key={item.id} item={item} />
					))}
				</div>
			</div>
			<div className="section-albums" aria-label="Playlist">
				<div className="section-albums_header">
					<h2 className="section-albums_title" as="h2">Tus playlist favoritos</h2>
				</div>
				<div className="section-albums_grid">
					{Object.keys(playlists).length > 0 && playlists?.items.map((item) => (
						<AlbumItem key={item.id} item={item} />
					))}
				</div>
			</div>
			<div className="user-albums">

			</div>
		</div>
	  </div>
	);
  }

export default Home;
