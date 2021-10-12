import React from "react";
import "../styles/Option.css";
import { Link } from 'react-router-dom';


function PlaylistOption({ title, Image, Linkto, idPlaylist }) {

  function setPlaylist ( id ) {
    console.log( id );
    // dispatch({
    //   type: "SET_PLAYLISTS",
    //   playlists,
    // });
  }
  return (
    <div id={"id-" + idPlaylist} className="playlistOption">
      <Link  to={{pathname: `/playlist/${idPlaylist}`,
                state: { fromDashboard: true }}}
                onClick={setPlaylist( idPlaylist )}
        >
        {Image && <img src={Image}  title ={title} />}
        {Image ? <h4>{title}</h4> : <p>{title}</p>}
      </Link>
    </div>
  );
}

export default PlaylistOption;