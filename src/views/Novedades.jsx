
import React, {useState,useEffect} from 'react';
import { useDataLayerValue } from "../DataLayer";
import { PlayCircleFilled, Favorite, MoreHoriz } from "@material-ui/icons";
import SongRow from "../SongRow";
import SongTop from '../items/SongTop';
import AlbumItem from '../items/AlbumItem';

function Novedades() {
    const [{ token, playlists, user }, dispatch] = useDataLayerValue();
	const [error, setError] = useState(null);
	const [novedades, setNovedades] = useState([]);

    const getNovedades = async () => {
        const novedadesUrl = `https://api.spotify.com/v1/browse/new-releases?country=ES&limit=20`;
        const res = await fetch(novedadesUrl, {headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
        }});

        const result = await res.json();
        return result
      }

	useEffect(() => {
		const albums = getNovedades().then( items => setNovedades(items.albums));
		console.log(getNovedades());
	}, [])
  return (
    <div className="home">
			<section className="body__info" style={{marginBottom: '75px'}}>
			{<img src={user?.images[0]?.url} alt={user?.display_name} width={user?.images[0]?.width + 'px'} height={user?.images[0]?.height + 'px'} /> }
				<div className="body__infoText">
					<strong>user</strong>
					{ <h2>{user?.display_name}</h2>}
				</div>
			</section>
			<section className="body__songs">
				<div className="section-albums" aria-label="Artists">
					<div className="section-albums_header">
						<h2 className="section-albums_title" as="h2">NOVEDADES</h2>
					</div>
					<div className="section-albums_grid">
						{Object.keys(novedades).length > 0 && novedades?.items.map((item) => (
							<AlbumItem key={item.id} item={item} />
						))}
					</div>
				</div>
			</section>
		</div>
    );
}

export default Novedades;
