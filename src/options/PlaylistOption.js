import React from "react";
import "../styles/Option.css";
import { Link } from 'react-router-dom';


function PlaylistOption({ title, Image, Linkto, idPlaylist }) {

  return (
    <div id={"playlistOption-" + idPlaylist} className="playlistOption">
      <Link  to={{pathname: `/Playlist/${idPlaylist}`,
                state: { fromDashboard: true }}}
        >
        {Image && <img src={Image}  title={title} width="191" height="191" alt={title}/>}
        {Image ? <h4>{title}</h4> : <p>{title}</p>}
      </Link>
    </div>
  );
}

export default PlaylistOption;