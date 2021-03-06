import React from "react";
import { Search } from "@material-ui/icons";
import "./styles/Header.css";
import { Avatar } from "@material-ui/core";
import { useDataLayerValue } from "./DataLayer";

function Header() {
	const [{ user }] = useDataLayerValue();

	return (
		<header className="header">
			<div className="header__left">
				<Search />
				<input placeholder="Search for Artists, Songs, or Albums" type="text" />
			</div>
			<div className="header__right">
				<Avatar src={user?.images[0]?.url} alt={user?.display_name} />
				<h4>{user?.display_name}</h4>
			</div>
		</header>
	);
}

export default Header;
