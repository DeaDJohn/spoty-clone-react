import React from "react";
import { Link } from "react-router-dom";
import "./styles/SongRow.css";


function SongRow({ track }) {

  return (
    <div className="songRow">
      <img src={track?.album.images[0]?.url} alt="" className="songRow__album" />
      <div className="songRow__info">
        <h1>{track?.name}</h1>
        <p>
          	{track?.artists.map((artist) => <Link to={`/Artist/${artist?.id}`}>{artist?.name}</Link>)} -{" "}

		  	<Link to={`/Album/${track?.album.id}`}>
          {track?.album.name}
        </Link>
        </p>
      </div>
    </div>
  );
}

export default SongRow;
