import React from "react";
import "./Sidebar.css";
import SidebarOption from "./options/SidebarOption";
import PlaylistOption from "./options/PlaylistOption";

import HomeIcon from "@material-ui/icons/Home";
import SearchIcon from "@material-ui/icons/Search";
import { LibraryMusic } from "@material-ui/icons";
import { useDataLayerValue } from "./DataLayer";

function Sidebar() {
  const [{ playlists }, dispatch] = useDataLayerValue();
console.log(playlists);
  return (
    <div className="sidebar">
      <img
        className="sidebar__logo"
        src="https://music-b26f.kxcdn.com/wp-content/uploads/2017/06/635963274692858859903160895_spotify-logo-horizontal-black.jpg"
        alt="Spotify logo"
      />

      <SidebarOption title="Home" Icon={HomeIcon}  />
      <SidebarOption title="Search" Icon={SearchIcon} Linkto={"/search"} />
      <SidebarOption title="Your Library" Icon={LibraryMusic} Linkto={"/your-library"} />
      <br />
      <strong className="sidebar__title">PLAYLISTS</strong>
      <hr />
      {playlists?.items?.map((playlist) => (
        <PlaylistOption title={playlist.name} idPlaylist={playlist.id} />
      ))}
    </div>
  );
}

export default Sidebar;
