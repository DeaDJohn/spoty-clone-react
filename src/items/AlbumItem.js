import React from "react";
import {Link} from 'react-router-dom';

function AlbumItem({item}) {


  return (
	<div className="albumItem">
		<div className="albumItem_container">
			<div className="albumItem_header">
				<div className="">
					<div className=""><img aria-hidden="false" draggable="false" loading="lazy"
							src={item?.images[0].url}
							data-testid="card-image" alt={item.name} className="albumItem_img" /></div>
				</div>
				<div className="albumItem_cover">
					<button className="albumItem_button"><svg height="16" role="img" width="16" viewBox="0 0 24 24"
							aria-hidden="true">
							<polygon points="21.57 12 5.98 3 5.98 21 21.57 12" fill="currentColor"></polygon>
						</svg></button></div>
			</div>
			<div className="" >
				<Link className="albumItem_title" draggable="false" title={item.name}
					to={"/" + item.type + "/" + item?.id}>
					{item.name}
				</Link>
				{
					item.type === "album" &&
					<div className="" >
						<time dateTime={(new Date(item?.release_date)).getFullYear()}>{(new Date(item?.release_date)).getFullYear()}</time> - <span className="" style={{textTransform: 'capitalize'}}>{item.type}</span></div>
				}
				</div>
			<div className="" data-testid="card-click-handler"></div>
		</div>
	</div>
  );
}

export default AlbumItem;