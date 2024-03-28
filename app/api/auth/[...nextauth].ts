// // pages/api/auth/[...nextauth].ts
// import NextAuth from "next-auth";
// import SpotifyProvider from "next-auth/providers/spotify";

// export default NextAuth({
//   providers: [
//     SpotifyProvider({
//       clientId: process.env.SPOTIFY_CLIENT_ID,
//       clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
//       authorization: { params: { scope: "streaming user-read-email user-read-private" } }, // Add your required scopes here
//     }),
//   ],
//   callbacks: {
//     authorized({ request, auth }) {
//       const { pathname } = request.nextUrl
//       if (pathname === "/middleware-example") return !!auth
//       return true
//     },
//     async jwt({ token, account, profile }) {
//       // Persist the OAuth access_token and or the user id to the token right after signin
//       // console.log("TOKEN: " + Object.keys(token))
//       // if (account){
//       //   console.log("ACCOUNT: " + Object.keys(account))
//       // }
//       // if (profile){
//       //   console.log("PROFILE: " + Object.keys(profile))
//       // }
//       if (account) {
//         // token.accessToken = account.access_token
//         // let tracks = new Tracks()
//         console.log("Access Token: " + account.access_token)

//         var SpotifyWebApi = require('spotify-web-api-node');
    
//         // credentials are optional
//         var spotifyApi = new SpotifyWebApi({
//           clientId: '1a6471f93c664dfd81ab30423bccd9c4',
//           clientSecret: '22b332d643a348abb981e268852fc4b0',
//           redirectUri: 'http://www.example.com/callback'
//         });

//         // // spotifyApi.

//         // // let SpotifyAPI = new SpotifyUserAPI()
//         spotifyApi.setAccessToken(account.access_token);
//         // SpotifyAPI.createPlay
//         // // SpotifyAPI.createPlaylist()

//         // SpotifyUserAPI.createPlaylistFromSongList(spotifyApi, Tracks.getTrackListIds())
        
//       }
//       return token
//     }
//   },
//   // Add any additional NextAuth configuration here
// });