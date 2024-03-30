// 'use client'
// import { signOut } from "auth"
import { signIn, signOut } from "next-auth/react"
import { Button } from "./ui/button"

export function SignIn({
  provider,
  ...props
}: { provider?: string } & React.ComponentPropsWithRef<typeof Button>) {

  return (
    <Button variant="ghost" className="w-full p-0" onClick={() => signIn('spotify')} {...props}>
      Link Spotify
    </Button>
  )
}

  export function SignOut(props: React.ComponentPropsWithRef<typeof Button>) {
    const handleSignOut = async () => {
      await signOut({ redirect: false }) // Prevents automatic redirection after sign out
      location.reload()
    }

    return (
      <Button variant="ghost" className="w-full p-0" onClick={handleSignOut} {...props}>
        Sign Out
      </Button>
    )
  }