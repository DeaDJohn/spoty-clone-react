import SpotifyWebApi from "spotify-web-api-js";
import React ,{useState,useEffect }from 'react';
import { PlayCircleFilled, Favorite, MoreHoriz } from "@material-ui/icons";
import AlbumItem from '../items/AlbumItem';
import { useParams } from 'react-router';
import '../styles/AlbumSection.css';



const spotify = new SpotifyWebApi();

function Artist() {

	let { id } = useParams()

	// const [error, setError] = useState(null);
	// const [isLoaded, setIsLoaded] = useState(false);
	const [artist, setArtist] = useState([]);
	const [albums, setAlbums] = useState([]);
	const [topSongs, setTopSongs] = useState([]);
	const [relatedArtist, setRelatedArtist] = useState([]);
	// const artistUrl = `https://api.spotify.com/v1/artists/${id}`;
	// const artistAlbumsUrl = `https://api.spotify.com/v1/artists/${id}/albums`;

	useEffect(() => {

		Promise.all([
			spotify.getArtist(id),
			spotify.getArtistAlbums(id),
			spotify.getArtistTopTracks(id, "ES"),
			spotify.getArtistRelatedArtists(id),
		]).then(function (data) {
			setArtist(data[0]);;
			setAlbums(data[1]);
			setTopSongs(data[2]);
			setRelatedArtist(data[3]);
		}).catch(function (error) {
			// if there's an error, log it
			console.log(error);
		});

	  }, [id])

	return (
	  	<div className="artist">
			<section className="body__info">
				{Object.keys(artist).length > 0 &&<img src={artist?.images[0]?.url} alt={artist?.name} width={artist?.images[0]?.width + 'px'} height={artist?.images[0]?.height + 'px'} /> }
				<div className="body__infoText">
					<strong>Artist</strong>
					{Object.keys(artist).length > 0 && <h2>{artist?.name}</h2>}
					{Object.keys(artist).length > 0 && <p>{artist?.description}</p>}
					{Object.keys(artist).length > 0 && artist?.genres.map((genre) => (
						<span className="badge badge-genre">{genre}</span>
					))}
				</div>
			</section>
			<section className="body__songs">
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
							<div id={`songTop-${item?.id}`} key={item?.id} className="songTop">
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
			</section>
	  	</div>
	);
  }

export default Artist;
