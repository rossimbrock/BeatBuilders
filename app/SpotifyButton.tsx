// Some React component
import SpotifyUserAPI from "@/SpotifyUserAPI";
import Tracks from "@/Tracks";
import { signIn, signOut, useSession } from "next-auth/react";

interface SpotifyButtonProps {
  tracks: Tracks[]
}
// const SpotifyLoginButton = () => {
const SpotifyButton: React.FC<SpotifyButtonProps> = ({ tracks }) => {
  const { data: session } = useSession();

  if (session) {
    return (
      <button onClick={() => SpotifyUserAPI.createPlaylistFromSongList(tracks)}>
        Add Playlist To Spotify
      </button>
      // <button onClick={() => signOut()}>Log in with Spotify</button>
    )
  }

  return (
    <button onClick={() => signIn('spotify')}>Log in with Spotify</button>
  );
}

export default SpotifyButton;