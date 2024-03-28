// Some React component
import SpotifyUserAPI from "@/SpotifyUserAPI";
import Track from "@/Track";
import { signIn, signOut, useSession } from "next-auth/react";

interface SpotifyButtonProps {
  tracks: Track[]
  setTracks: (tracks: Track[]) => void;
}

const SpotifyButton: React.FC<SpotifyButtonProps> = ({ tracks, setTracks }) => {
  const { data: session } = useSession();

  const handleCreatePlaylistClick = () => {
    if (session){
      // initialize API, set token
      let SpotifyUserApi = new SpotifyUserAPI(session.user.access_token);
      SpotifyUserAPI.createPlaylistFromSongList(Track.getTrackListIds(tracks));
      localStorage.clear();
      setTracks([]);
    }
  }

  if (session) {
    return (
      <div>
        <button onClick={handleCreatePlaylistClick}>
          Add Playlist To Spotify
        </button>
        {"   |   "}
        {/* Sign Out Button temporary for now, but I need to further test the Refresh Token Rotation */}
        <button onClick={() => signOut()}>
          Sign Out
        </button>
      </div>
    )
  }

  return (
    <button onClick={() => signIn('spotify')}>Log in with Spotify</button>
  );
}

export default SpotifyButton;