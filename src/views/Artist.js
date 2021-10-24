import SpotifyWebApi from "spotify-web-api-js";
import React ,{useState,useEffect }from 'react';
import { useDataLayerValue } from "../DataLayer";
import { PlayCircleFilled, Favorite, MoreHoriz } from "@material-ui/icons";
import SongRow from "../SongRow";
import AlbumItem from '../items/AlbumItem';
import { useParams } from 'react-router';
import '../styles/AlbumSection.css';



const spotify = new SpotifyWebApi();

function Artist() {

	let { id } = useParams()

	const [error, setError] = useState(null);
	const [isLoaded, setIsLoaded] = useState(false);
	const [artist, setArtist] = useState([]);
	const [albums, setAlbums] = useState([]);
	const [topSongs, setTopSongs] = useState([]);
	const [relartedArtist, setRelartedArtist] = useState([]);
	// const artistUrl = `https://api.spotify.com/v1/artists/${id}`;
	// const artistAlbumsUrl = `https://api.spotify.com/v1/artists/${id}/albums`;

	useEffect(() => {

		console.log( spotify.getArtist(id) );

		spotify.getArtist(id).then((artist) => {
			console.log('Artista: ' + artist);
			setArtist(artist);
		});

		spotify.getArtistAlbums(id).then(
			function (data) {
			  console.log('Artist albums', data);
			  setAlbums(data)
			},
			function (err) {
			  console.error(err);
			}
		  );
		spotify.getArtistTopTracks(id, "ES").then(
			function (data) {
				console.log('Artist top', data);
				setTopSongs(data)
			  },
			  function (err) {
				console.error(err);
			  }
		);
		spotify.getArtistRelatedArtists(id).then(
			function (data) {
				console.log('Artist top', data);
				setRelartedArtist(data)
			  },
			  function (err) {
				console.error(err);
			  }
		)
		// Info Artist
		// fetch(artistUrl, {headers: {
		// 	"Accept": "application/json",
		// 	"Content-Type": "application/json",
		// 	"Authorization": `Bearer ${token}`,
		//   }})
		//   .then(res => res.json())
		//   .then(
		// 	  (result) => {
		// 		// console.log(result);
		// 	  setIsLoaded(true);
		// 	  setArtist(result);
		// 	},
		// 	// Nota: es importante manejar errores aquí y no en 
		// 	// un bloque catch() para que no interceptemos errores
		// 	// de errores reales en los componentes.
		// 	(error) => {
		// 	  setIsLoaded(true);
		// 	  setError(error);
		// 	}
		//   )
		  // Albums Artist
		// fetch(artistAlbumsUrl, {headers: {
		// 	"Accept": "application/json",
		// 	"Content-Type": "application/json",
		// 	"Authorization": `Bearer ${token}`,
		//   }})
		//   .then(res => res.json())
		//   .then(
		// 	  (result) => {
		// 		// console.log(result);
		// 	  setIsLoaded(true);
		// 	  setAlbums(result);
		// 	},
		// 	// Nota: es importante manejar errores aquí y no en 
		// 	// un bloque catch() para que no interceptemos errores
		// 	// de errores reales en los componentes.
		// 	(error) => {
		// 	  setIsLoaded(true);
		// 	  setError(error);
		// 	}
		//   )
	  }, [id])

	return (
	  <div className="artist">
		  {console.log(Object.keys(artist).length)}
			<div className="body__info">
			{Object.keys(artist).length > 0 &&<img src={artist?.images[0]?.url} alt={artist?.name} width={artist?.images[0]?.width + 'px'} height={artist?.images[0]?.height + 'px'} /> }
			<div className="body__infoText">
				<strong>Artist</strong>
				{Object.keys(artist).length > 0 && <h2>{artist?.name}</h2>}
				{Object.keys(artist).length > 0 && <p>{artist?.description}</p>}
				{Object.keys(artist).length > 0 && artist?.genres.map((genre) => (
					<span className="badge badge-genre">{genre}</span>
				))}
			</div>
		</div>
		<div className="body__songs">
			<div className="body__icons">
				<PlayCircleFilled className="body__shuffle" />
				<Favorite fontSize="large" />
				<MoreHoriz />
			</div>
			<div className="section-topSong" aria-label="Álbumes">
				<div className="section-topSong_header">
					<h2 className="section-topSong_title" as="h2">TOPS</h2>
				</div>
				<div className="section-topSong_grid">
					{Object.keys(topSongs).length > 0 && topSongs?.tracks.map((item, index) => (
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
			<div className="section-albums" aria-label="Álbumes">
				<div className="section-albums_header">
					<h2 className="section-albums_title" as="h2">Álbumes</h2>
				</div>
				<div className="section-albums_grid">
					{Object.keys(albums).length > 0 && albums?.items.map((item) => (
						<AlbumItem key={item.id} item={item} />
					))}
				</div>
			</div>
		</div>
	  </div>
	);
  }

export default Artist;
