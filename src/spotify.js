export const authEndpoint = "https://accounts.spotify.com/authorize";
let redirectUri = "http://localhost:3000/";
const clientId = "769313b52bbe420bad3030547bf35592";

if(process.env.NETLIFY){
  redirectUri = "https://juanjofb-spotify-clone.netlify.app/";
}
console.log(redirectUri);
console.log(process.env.NETLIFY);
console.log(process.env);
console.log(process);
const scopes = [
  "user-read-currently-playing",
  "user-read-recently-played",
  "user-read-playback-state",
  "user-top-read",
  "user-modify-playback-state",
  "playlist-read-private"
];

export const getTokenFromUrl = () => {
    return window.location.hash
      .substring(1)
      .split("&")
      .reduce((initial, item) => {
        let parts = item.split("=");
        initial[parts[0]] = decodeURIComponent(parts[1]);
        return initial;
      }, {});
  };

export const loginUrl = `${authEndpoint}?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes.join(
  "%20"
)}&response_type=token&show_dialog=true`;