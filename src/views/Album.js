import React ,{useState,useEffect }from 'react';
import { useDataLayerValue } from "../DataLayer";
import { PlayCircleFilled, Favorite, MoreHoriz } from "@material-ui/icons";
import SongRow from "../SongRow";
import { useParams } from 'react-router';

function Album() {
	const [{ token }, dispatch] = useDataLayerValue();
	let { id } = useParams()
    console.log(id);
	const [error, setError] = useState(null);
	const [isLoaded, setIsLoaded] = useState(false);
	const [album, setAlbum] = useState([]);
	const albumUrl = `https://api.spotify.com/v1/album/${id}`;

	useEffect(() => {
		fetch(albumUrl, {headers: {
			"Accept": "application/json",
			"Content-Type": "application/json",
			"Authorization": `Bearer ${token}`,
		  }})
		  .then(res => res.json())
		  .then(
			  (result) => {
				// console.log(result);
			  setIsLoaded(true);
			  setAlbum(result);
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
	  <div className="album">
		  {console.log(Object.keys(album).length)}
			<div className="body__info">
			{Object.keys(album).length > 0 &&<img src={album?.images[0]?.url} alt="" /> }
			<div className="body__infoText">
				<strong>album</strong>
				{Object.keys(album).length > 0 && <h2>{album?.name}</h2>}
				{Object.keys(album).length > 0 && <p>{album?.description}</p>}
			</div>
		</div>
		<div className="body__songs">
			<div className="body__icons">
				<PlayCircleFilled className="body__shuffle" />
				<Favorite fontSize="large" />
				<MoreHoriz />
			</div>
			{Object.keys(album).length > 0 && album?.tracks.items.map((item) => (
				<SongRow key={item.track?.id} track={item.track} />
			))} 
		</div>
	  </div>
	);
  }

export default Album;
