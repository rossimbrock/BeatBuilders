import SpotifyUserAPI from "@/SpotifyUserAPI";
import Track from "@/Track";
import { signIn, signOut, useSession } from "next-auth/react";

interface SpotifyButtonProps {
  setCreatePlaylistClicked: (createPlaylistClicked: boolean) => void;
}

const SpotifyButton: React.FC<SpotifyButtonProps> = ({ setCreatePlaylistClicked }) => {
  const { data: session } = useSession();

  if (session) {
    return (
      <div>
        <button onClick={() => setCreatePlaylistClicked(true)}>
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