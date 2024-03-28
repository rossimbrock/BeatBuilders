export default class SpotifyUserAPI {

    static accessToken;
    static SpotifyWebApi;
    static spotifyApi;

    constructor() {
      SpotifyUserAPI.SpotifyWebApi = require('spotify-web-api-node');
      SpotifyUserAPI.spotifyApi = SpotifyUserAPI.SpotifyWebApi.SpotifyWebApi({
        clientId: process.env.AUTH_SPOTIFY_ID,
        clientSecret: process.env.AUTH_SPOTIFY_SECRET,
        redirectUri: 'http://www.example.com/callback'
      });
    }
    
    // How can we do this programitcally??
    // curl -X POST "https://accounts.spotify.com/api/token" \
    //     -H "Content-Type: application/x-www-form-urlencoded" \
    //     -d "grant_type=client_credentials&client_id=1a6471f93c664dfd81ab30423bccd9c4&client_secret=9b4c1e32ab27413d8f7c0c13236fbf0a"

    static setAccessToken(token){
        SpotifyUserAPI.accessToken = token;
        SpotifyUserAPI.spotifyApi.setAccessToken(token);
    }
    
    // Print Albums for an Artist
    // spotifyApi.getArtistAlbums("7o1TBmx7Ube5h2Czlam84O").then(
    //     function(data) {
    //         // console.log(data);
    //         data.body.items.forEach(element => {
    //             console.log(element);
    //         });
    //     },
    //     function(err) {
    //         console.log(err);
    //     }
    // )
    static createPlaylist(spotifyApi){
        spotifyApi.getUserPlaylists()
          .then(function(data) {
            console.log(data.body);
            return data.body.items.map(playlist => playlist.id);
          })
          .then(function(playlistIds) {
            var promises = playlistIds.map(id => {
              // var trackName, trackId;
              // spotifyApi.getPlaylistTracks(id, {limit : 1}).then(
              //   function(data){
              //     track = data.body.items[0].track;
              //     // console.log(track.name, track.id);
              //     // console.log(data.body.track.name);
              //     // newPlaylist.push([track.name, track.id]);
              //     return [track.name, track.id];
              // })
              return spotifyApi.getPlaylistTracks(id, {limit : 1});
            })
            return Promise.all(promises);
          }).then(function(promises){
            return promises.map(promise => {
              track = promise.body?.items[0]?.track;
              // console.log(track.body.items[0])
              return track ? track.uri : "";
            })
          }).then(function(newPlaylist) {
            // console.log(newPlaylist);
            spotifyApi.createPlaylist('Finally', { 'description': 'My description', 'public': false })
              .then(function(data) {
                // console.log(data);
                spotifyApi.addTracksToPlaylist(data.body.id, newPlaylist);
              })
          })
          .catch(function(err) {
            console.error(err);
          })
    }

    static createPlaylistFromSongList(tracks){
      // spotifyApi.getUserPlaylists()
      //   .then(function(data) {
      //     console.log(data.body);
      //     return data.body.items.map(playlist => playlist.id);
      //   })
      //   .then(function(playlistIds) {
      //     var promises = playlistIds.map(id => {
      //       return spotifyApi.getPlaylistTracks(id, {limit : 1});
      //     })
      //     return Promise.all(promises);
      //   }).then(function(promises){
      //     return promises.map(promise => {
      //       track = promise.body?.items[0]?.track;
      //       return track ? track.uri : "";
      //     })
      //   }).then(function(newPlaylist) {
      //     // console.log(newPlaylist);
      //     spotifyApi.createPlaylist('Finally', { 'description': 'My description', 'public': false })
      //       .then(function(data) {
      //         // console.log(data);
      //         spotifyApi.addTracksToPlaylist(data.body.id, newPlaylist);
      //       })
      //   })

      SpotifyUserAPI.spotifyApi.createPlaylist('HarmonyHub Playlist', { 'description': 'My description', 'public': false })
            .then(function(data) {
              // console.log(data);
              SpotifyUserAPI.spotifyApi.addTracksToPlaylist(data.body.id, tracks);
            })
        .catch(function(err) {
          console.error(err);
        })
  }
    // spotifyApi.addToMySavedAlbums
    // // Print Songs, Artists for a playlist
    // spotifyApi.getPlaylistTracks("37i9dQZF1DX8zPOPPFGNc8").then(
    //     function(data) {
    //         data.body.items.forEach(element => {
    //             console.log(
    //                 element.track.artists[0].name + "\n" + element.track.name + "\n"
    //             );
    //         });
    //     },
    //     function(err) {
    //         console.log(err);
    //     }
    // )
}