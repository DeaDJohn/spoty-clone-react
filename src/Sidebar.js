import React from "react";
import "./styles/Sidebar.css";
import SidebarOption from "./options/SidebarOption";
import PlaylistOption from "./options/PlaylistOption";

import HomeIcon from "@material-ui/icons/Home";
import SearchIcon from "@material-ui/icons/Search";
import { LibraryMusic } from "@material-ui/icons";
import { useDataLayerValue } from "./DataLayer";
import slugify from 'react-slugify';

function Sidebar() {
  const [{ playlists }, dispatch] = useDataLayerValue();
  return (
    <div className="sidebar">
      <img
        className="sidebar__logo"
        src="https://music-b26f.kxcdn.com/wp-content/uploads/2017/06/635963274692858859903160895_spotify-logo-horizontal-black.jpg"
        alt="Spotify logo"
      />

      <SidebarOption key={slugify("Home")} title="Home" Icon={HomeIcon}  />
      <SidebarOption key={slugify("Search")} title="Search" Icon={SearchIcon} Linkto={"/search"} />
      <SidebarOption key={slugify("Your  Library")} title="Your Library" Icon={LibraryMusic} Linkto={"/your-library"} />
      <br />
      <strong className="sidebar__title">PLAYLISTS</strong>
      <hr />
      {playlists?.items?.map((playlist) => (
        <PlaylistOption key={playlist.idPlaylist} title={playlist.name} idPlaylist={playlist.id} Image={playlist.images[0].url} />
      ))}
    </div>
  );
}

export default Sidebar;
