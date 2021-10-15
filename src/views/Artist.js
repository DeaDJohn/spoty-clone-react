import React ,{useState,useEffect }from 'react';
import { useDataLayerValue } from "../DataLayer";
import { PlayCircleFilled, Favorite, MoreHoriz } from "@material-ui/icons";
import SongRow from "../SongRow";
import { useParams } from 'react-router';
import '../styles/AlbumSection.css';
import {Link} from 'react-router-dom';

function Artist() {
	const [{ token }, dispatch] = useDataLayerValue();
	let { id } = useParams()
    console.log(id);
	const [error, setError] = useState(null);
	const [isLoaded, setIsLoaded] = useState(false);
	const [artist, setArtist] = useState([]);
    const [albums, setAlbums] = useState([]);
	const artistUrl = `https://api.spotify.com/v1/artists/${id}`;
    const artistAlbumsUrl = `https://api.spotify.com/v1/artists/${id}/albums`;

	useEffect(() => {
        // Info Artist
		fetch(artistUrl, {headers: {
			"Accept": "application/json",
			"Content-Type": "application/json",
			"Authorization": `Bearer ${token}`,
		  }})
		  .then(res => res.json())
		  .then(
			  (result) => {
				// console.log(result);
			  setIsLoaded(true);
			  setArtist(result);
			},
			// Nota: es importante manejar errores aquí y no en 
			// un bloque catch() para que no interceptemos errores
			// de errores reales en los componentes.
			(error) => {
			  setIsLoaded(true);
			  setError(error);
			}
		  )
          // Albums Artist
		fetch(artistAlbumsUrl, {headers: {
			"Accept": "application/json",
			"Content-Type": "application/json",
			"Authorization": `Bearer ${token}`,
		  }})
		  .then(res => res.json())
		  .then(
			  (result) => {
				// console.log(result);
			  setIsLoaded(true);
			  setAlbums(result);
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
	  <div className="artist">
		  {console.log(Object.keys(artist).length)}
			<div className="body__info">
			{Object.keys(artist).length > 0 &&<img src={artist?.images[0]?.url} alt="" /> }
			<div className="body__infoText">
				<strong>Artist</strong>
				{Object.keys(artist).length > 0 && <h2>{artist?.name}</h2>}
				{Object.keys(artist).length > 0 && <p>{artist?.description}</p>}
			</div>
		</div>
		<div className="body__songs">
			<div className="body__icons">
				<PlayCircleFilled className="body__shuffle" />
				<Favorite fontSize="large" />
				<MoreHoriz />
			</div>
            <div className="section-albums" aria-label="Álbumes">
                <div className="section-albums_header">
                    <h2 className="section-albums_title" as="h2">Álbumes</h2>
                </div>
                <div className="section-albums_grid">
                    {Object.keys(albums).length > 0 && albums?.items.map((item) => (
                        <div className="albumItem">
                            <div className="albumItem_container">
                                <div className="albumItem_header">
                                    <div className="">
                                        <div className=""><img aria-hidden="false" draggable="false" loading="lazy"
                                                src={item?.images[0].url}
                                                data-testid="card-image" alt={item.name} className="albumItem_img" /></div>
                                    </div>
                                    <div className="albumItem_cover">
                                        <button className="albumItem_button"><svg height="16" role="img" width="16" viewBox="0 0 24 24"
                                                aria-hidden="true">
                                                <polygon points="21.57 12 5.98 3 5.98 21 21.57 12" fill="currentColor"></polygon>
                                            </svg></button></div>
                                </div>
                                <div className="">
                                    <Link className="albumItem_title" draggable="false" title={item.name}
                                        to="/album/{item?.id}">
                                        {item.name}
                                    </Link>
                                    <div className="" >
                                        <time datetime={item?.release_date}>{item?.release_date}</time><span className="">Álbum</span></div>
                                </div>
                                <div className="" data-testid="card-click-handler"></div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
		</div>
	  </div>
	);
  }

export default Artist;