export default class SpotifyUserAPI {

    static accessToken;
    static spotifyApi;

    constructor(token) {
      let SpotifyWebApi = require('spotify-web-api-node');
      SpotifyUserAPI.spotifyApi = new SpotifyWebApi({
        clientId: process.env.AUTH_SPOTIFY_ID,
        clientSecret: process.env.AUTH_SPOTIFY_SECRET,
        redirectUri: 'http://www.example.com/callback'
      });
      SpotifyUserAPI.accessToken = token;
      SpotifyUserAPI.spotifyApi.setAccessToken(token);
    }

    static createPlaylistFromSongList(tracks, playListName){
      SpotifyUserAPI.spotifyApi.createPlaylist(playListName, { 'description': 'My description', 'public': false })
            .then(function(data) {
              SpotifyUserAPI.spotifyApi.addTracksToPlaylist(data.body.id, tracks);
            })
        .catch(function(err) {
          console.error(err);
        })
  }
}