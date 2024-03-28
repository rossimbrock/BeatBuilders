import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"
import { Button } from "./ui/button"
// import { auth } from "auth"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu"
// import { useSession } from "next-auth/react";

import { SignIn, SignOut } from "./auth-components"
import exp from "constants"
import { GetServerSideProps } from 'next';
import { auth } from "auth"
import { Session } from "next-auth";

type UserButtonProps = {
  // session: Session | null; // Define SessionType according to your auth() function's return type
  tracks: Array<Object>;
};

// export default async function UserButton(props) {
const UserButton: React.FC<UserButtonProps> = async ({ tracks }) => {
  const session = await auth()
  // const { data: session } = useSession();
  if (!session?.user) return <SignIn />

  // var SpotifyWebApi = require('spotify-web-api-node');
    
  //       // credentials are optional
  //   var spotifyApi = new SpotifyWebApi({
  //     clientId: '1a6471f93c664dfd81ab30423bccd9c4',
  //     clientSecret: '22b332d643a348abb981e268852fc4b0',
  //     redirectUri: 'http://www.example.com/callback'
  //   });

  //   // spotifyApi.

  //   // let SpotifyAPI = new SpotifyUserAPI()
  //   spotifyApi.setAccessToken(token.accessToken);
  //   // SpotifyAPI.createPlaylist()

  //   SpotifyUserAPI.createPlaylistFromSongList(spotifyApi, tracks)
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative w-8 h-8 rounded-full">
          <Avatar className="w-8 h-8">
            {session.user.image && (
              <AvatarImage
                src={session.user.image}
                alt={session.user.name ?? ""}
              />
            )}
            <AvatarFallback>{session.user.email}</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">
              {session.user.name}
            </p>
            <p className="text-xs leading-none text-muted-foreground">
              {session.user.email}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuItem>
          <SignOut />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default UserButton