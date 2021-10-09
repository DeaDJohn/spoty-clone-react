import React from "react";
import "./Option.css";
import { NavLink } from 'react-router-dom';
import slugify from 'react-slugify';

function SidebarOption({ title, Icon, Linkto, idPlaylist }) {

  let idElm = idPlaylist ? idPlaylist : slugify('menu-'+ title);
  return (
    <div id={idElm} className="sidebarOption">
      <NavLink to={Linkto ? Linkto : '/'} activeClassName="selected" exact={true}>
        {Icon && <Icon className="sidebarOption__icon" />}
        {Icon ? <h4>{title}</h4> : <p>{title}</p>}
      </NavLink>
    </div>
  );
}

export default SidebarOption;
