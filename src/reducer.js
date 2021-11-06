export const initialState = {
	user: null,
	// REMOVE after development
	token: null,
	playlists: [],
	playing: false,
	item: null,
	currentPlaylist: null,
	currentSong: null
};

const reducer = (state, action) => {
	console.log(action);

	switch (action.type) {
		case "SET_USER":
			return {
				...state,
				user: action.user,
			};
		case "SET_TOKEN":
			return {
				...state,
				token: action.token,
			};
		case "SET_PLAYLISTS":
			return {
				...state,
				playlists: action.playlists,
			};
		case "SET_DISCOVER_WEEKLY":
			return {
				...state,
				discover_weekly: action.discover_weekly,
			};
		case "SET_CURRENT_PLAYLISTS":
			return {
				...state,
				currentPlaylist: action.currentPlaylist,
			};
		case "SET_CURRENT_SONG":
			return {
				...state,
				currentSong: action.currentSong,
			};
		case "SET_CURRENT_VOLUME":
			return {
				...state,
				currentVolume: action.currentVolume,
			};
		default:
			return state;
	}
};

export default reducer;
