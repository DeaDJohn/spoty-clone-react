import React ,{useState,useEffect }from 'react';
import { useDataLayerValue } from "../DataLayer";
import { PlayCircleFilled, Favorite, MoreHoriz } from "@material-ui/icons";
import "../styles/SongRow.css";
import { useParams } from 'react-router';
import SongTop from '../items/SongTop';
import { Link } from "react-router-dom";
import  {getArtistAlbums}  from "../utils/utils";

function Album() {
	const [{ token }] = useDataLayerValue();
	let { id } = useParams()
	const [error, setError] = useState(null);
	const [isLoaded, setIsLoaded] = useState(false);
	const [album, setAlbum] = useState([]);

	useEffect(() => {
		getArtistAlbums(id, token)
		.then(
			(result) => {
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
		  ).catch( (error) => {
			console.log(error);
			setIsLoaded(true);
			setError(error);
		  } )
	  }, [id])

	return (
	  	<div className="album">
			<section className="body__info">
				{Object.keys(album).length > 0 &&<img src={album?.images[0]?.url} alt={album?.name} /> }
				<div className="body__infoText">
					<strong>Album</strong>
					{Object.keys(album).length > 0 && <h2>{album?.name}</h2>}
					{Object.keys(album).length > 0 && <p>{album?.description}</p>}
				</div>
			</section>
			<section className="body__songs">
				<div className="body__icons">
					<PlayCircleFilled className="body__shuffle" />
					<Favorite fontSize="large" />
					<MoreHoriz />
				</div>
				{Object.keys(album).length > 0 && album?.tracks.items.map((item, index) => (
					<SongTop key={item?.id} item={item} index={index} />
				))} 
			</section>
		</div>
	);
  }

export default Album;
