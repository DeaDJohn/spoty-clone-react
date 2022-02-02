
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
  
  const albumUrl = `https://api.spotify.com/v1/me/player/queue?uri=${uri}`;
  const response = await fetch(albumUrl, 
    {method: 'POST',
    headers: {
    
      "Accept": "application/json",
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`,
    }});

    console.log(response);
    if (response.status == 204) {
      return response.json();
    } else {
      throw new Error(response.status);
    }
}