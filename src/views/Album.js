import React ,{useState,useEffect }from 'react';
import { useDataLayerValue } from "../DataLayer";
import { PlayCircleFilled, Favorite, MoreHoriz } from "@material-ui/icons";
import "../styles/SongRow.css";
import { useParams } from 'react-router';
import { Link } from "react-router-dom";
import  {millisecondsToMinutesAndSeconds}  from "../utils/utils";

function Album() {
	const [{ token }] = useDataLayerValue();
	let { id } = useParams()
	const [error, setError] = useState(null);
	const [isLoaded, setIsLoaded] = useState(false);
	const [album, setAlbum] = useState([]);
	const albumUrl = `https://api.spotify.com/v1/albums/${id}`;


	useEffect(() => {
		fetch(albumUrl, {headers: {
			"Accept": "application/json",
			"Content-Type": "application/json",
			"Authorization": `Bearer ${token}`,
		  }})
		  .then(res => res.json())
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
		  )
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
				{Object.keys(album).length > 0 && album?.tracks.items.map((item) => (

					<div className="songTop ">
						<div className="songTop_row tracklist-row">
							<div className="songTop_position">
								<span>{item.track_number}</span>
							</div>
							<div className="songTop_information">
								<div className="songTop__info">
									<p>{item?.name}</p>
									{item.artists?.map( (artist) => (
										<span className="songTop__artist">
											<Link to={`/Artist/${artist?.id}`}>{artist?.name}</Link>, {" "}
										</span>
									))}
								</div>
							</div>
							<div className="songTop_time">
								{millisecondsToMinutesAndSeconds(item.duration_ms)}
							</div>
						</div>
					</div>
				))} 
			</section>
		</div>
	);
  }

export default Album;
