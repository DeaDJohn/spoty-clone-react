import React from "react";
// import {Link} from 'react-router-dom';
import {millisecondsToMinutesAndSeconds} from '../utils/utils';

function SongTop({item, index}) {

  return (
	<div id={`songTop-${item?.id}`} className="section-topSong_item"  className="songTop">
		<div className="songTop_row">
			<div className="songTop_position">
				<span>{index}</span>
			</div>
			<div className="songTop_information">
				{item?.album?.images[0].url && <img src={item?.album.images[0].url} alt={item?.name} className="songTop__album" />}
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