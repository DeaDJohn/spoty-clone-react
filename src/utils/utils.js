
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
export const setSongQueue = async (uri, token) => {
  const devices = await getDevice(token);
  console.log(devices);
  const queueUrl = `https://api.spotify.com/v1/me/player/queue?uri=${uri}&device_id=${devices}`;
  const response = await fetch(queueUrl,
    {method: 'POST',
    headers: {

      "Accept": "application/json",
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`,
    }});

    if (response.status == 204) {
      const res = await response.json();
      console.log( res);
      return res;
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
      const device = devices.devices.filter(item =>  item.is_active == true )

      return device[0].id;
    } else {
      throw new Error(response.status);
    }
}