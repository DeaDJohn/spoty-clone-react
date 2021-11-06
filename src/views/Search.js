import React from 'react';
import { useDataLayerValue } from "../DataLayer";
import { PlayCircleFilled, Favorite, MoreHoriz } from "@material-ui/icons";
import SongRow from "../SongRow";

function Search() {
	const [{ discover_weekly }, dispatch] = useDataLayerValue();
	return (
	  <div className="search">
			{/* <section className="body__info">
                <img src={discover_weekly?.images[0]?.url} alt="" />
                <div className="body__infoText">
                    <strong>PLAYLIST</strong>
                    <h2>Discover Weekly</h2>
                    <p>{discover_weekly?.description}</p>
                </div>
            </section> */}
            <section className="body__songs">
                <div className="body__icons">
                    <PlayCircleFilled className="body__shuffle" />
                    <Favorite fontSize="large" />
                    <MoreHoriz />
                </div>
                {discover_weekly?.tracks.items.map((item) => (
                    <SongRow track={item.track} />
                ))}
            </section>
	  </div>
	);
  }

export default Search;
