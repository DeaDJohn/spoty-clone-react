import React ,{useState,useEffect }from 'react';
import { useDataLayerValue } from "../DataLayer";
import { PlayCircleFilled, Favorite, MoreHoriz } from "@material-ui/icons";
import SongRow from "../SongRow";
import { useParams } from 'react-router';

function Playlist() {
	const [{ token }, dispatch] = useDataLayerValue();
	let { id } = useParams()
    console.log(id);
	const [error, setError] = useState(null);
	const [isLoaded, setIsLoaded] = useState(false);
	const [playlist, setPlaylist] = useState([]);
	const playlistUrl = `https://api.spotify.com/v1/playlists/${id}`;

	useEffect(() => {
		fetch(playlistUrl, {headers: {
			"Accept": "application/json",
			"Content-Type": "application/json",
			"Authorization": `Bearer ${token}`,
		  }})
		  .then(res => res.json())
		  .then(
			  (result) => {
				// console.log(result);
			  setIsLoaded(true);
			  setPlaylist(result);
			},
			// Nota: es importante manejar errores aquí y no en 
			// un bloque catch() para que no interceptemos errores
			// de errores reales en los componentes.
			(error) => {
			  setIsLoaded(true);
			  setError(error);
			}
		  )
	  }, [id])

	return (
		<div className="Playlist">
			<section className="body__info">
				{Object.keys(playlist).length > 0 &&<img src={playlist?.images[0]?.url} alt="" /> }
				<div className="body__infoText">
					<strong>PLAYLIST</strong>
					{Object.keys(playlist).length > 0 && <h2>{playlist?.name}</h2>}
					{Object.keys(playlist).length > 0 && <p>{playlist?.description}</p>}
				</div>
			</section>
			<section className="body__songs">
				<div className="body__icons">
					<PlayCircleFilled className="body__shuffle" />
					<Favorite fontSize="large" />
					<MoreHoriz />
				</div>
				{Object.keys(playlist).length > 0 && playlist?.tracks.items.map((item) => (
					<SongRow key={item.track?.id} track={item.track} />
				))} 
			</section>
		</div>
	);
  }

export default Playlist;
