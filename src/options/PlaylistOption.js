import React from "react";
import "./Option.css";
import { Link } from 'react-router-dom';


function PlaylistOption({ title, Icon, Linkto, idPlaylist }) {

  return (
    <div id={idPlaylist} className="playlistOption">
      <Link to={{pathname: "/playlist",
                hash: "#"+ idPlaylist,
                state: { fromDashboard: true }}} 
        >
        {Icon && <Icon className="playlistOption__icon" />}
        {Icon ? <h4>{title}</h4> : <p>{title}</p>}
      </Link>
    </div>
  );
}

export default PlaylistOption;