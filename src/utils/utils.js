
export function millisecondsToMinutesAndSeconds(millis) {
		var minutes = Math.floor(millis / 60000);
		var seconds = ((millis % 60000) / 1000).toFixed(0);
		return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
}

export const getArtistAlbums = async (id, token) => {

		const albumUrl = `https://api.spotify.com/v1/albums/${id}`;
		const response = await fetch(albumUrl, {headers: {
				"Accept": "application/json",
				"Content-Type": "application/json",
				"Authorization": `Bearer ${token}`,
			}});

			if (response.status == 200) {
				return response.json();
			} else {
				throw new Error(response.status);
			}
}

export const getDevice = async (token) => {
	const deviceUrl = `https://api.spotify.com/v1/me/player/devices`;
	const response = await fetch(deviceUrl,
		{headers: {
			"Accept": "application/json",
			"Content-Type": "application/json",
			"Authorization": `Bearer ${token}`,
		}});

		if (response.status == 200) {
			const devices = await response.json();
			const device = devices.devices.find(item =>  item.is_active == true )

			return device.id;
		} else {
			throw new Error(response.status);
		}
}