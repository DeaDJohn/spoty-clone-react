import React from "react";
// import {Link} from 'react-router-dom';
import {millisecondsToMinutesAndSeconds, getDevice} from '../utils/utils';
import { useDataLayerValue } from "../DataLayer";
import { useState } from "react";
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';


function SongTop({item, index}) {

	const [{ token }] = useDataLayerValue();

	const [addQueue, setAddQueue] = useState(false);
	const [addingQueue, setAddingQueue] = useState(false);

	const setSongQueue = async (uri, token) => {
		setAddingQueue(true);
		const devices = await getDevice(token);

		const queueUrl = `https://api.spotify.com/v1/me/player/queue?uri=${uri}&device_id=${devices}`;
		const response = await fetch(queueUrl,
			{method: 'POST',
			headers: {
				"Accept": "application/json",
				"Content-Type": "application/json",
				"Authorization": `Bearer ${token}`,
			}});


			if (response.status == 204) {
				// const res = await response.json();
				setTimeout(() => {
					setAddQueue(false);
					setAddingQueue(false);
				}, 1500);
				setAddQueue(true);
				return true;
			} else {
				throw new Error(response.status);
			}
	}

  return (
	<div id={`songTop-${item?.id}`}  className={`songTop ${addingQueue ? "loading" : ""}`} onClick={() => setSongQueue(item?.uri, token)}>
		<div className="songTop_row">
			<div className="songTop_position">
				<span>{index}</span>
			</div>
			<div className="songTop_information">
				{item?.album?.images[0].url && <img src={item?.album.images[0].url} alt={item?.name} className="songTop__album" />}
				<AddCircleOutlineIcon fontSize="medium" className="added__icon" />
				<div className="songTop__info">
					<p>{item?.name}</p>
				</div>
			</div>
			<div className="songTop_reproduction">
			</div>
			<div className="songTop_time">
				{millisecondsToMinutesAndSeconds(item.duration_ms)}
			</div>
		</div>
	</div>
  );
}

export default SongTop;