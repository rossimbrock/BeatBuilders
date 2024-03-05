'use client'
// import { signOut } from "auth"
import { signIn, signOut } from "next-auth/react"
import { Button } from "./ui/button"

export function SignIn({
  provider,
  ...props
}: { provider?: string } & React.ComponentPropsWithRef<typeof Button>) {
//   return (
//     <form
//       action={async () => {
//         "use server"
//         await signIn(provider)
//       }}
//     >
//       <Button {...props}>Link with Spotify</Button>
//     </form>
//   )
// }

  const handleSignIn = async () => {
    await signIn(provider) // Prevents automatic redirection after sign out
  }

  return (
    <Button variant="ghost" className="w-full p-0" onClick={handleSignIn} {...props}>
      Sign In
    </Button>
  )
}

// export function SignOut(props: React.ComponentPropsWithRef<typeof Button>) {
//   return (
//     <form
//       action={async () => {
//         "use server"
//         await signOut()
//       }}
//       className="w-full"
//     >
//       <Button variant="ghost" className="w-full p-0" {...props}>
//         Sign Out
//       </Button>
//     </form>
//   )
// }
// export function SignOut(props: React.ComponentPropsWithRef<typeof Button>) {
//   return (
//     <form action="/api/auth/signout" method="POST" className="w-full">
//       <Button type="submit" variant="ghost" className="w-full p-0" {...props}>
//         Sign Out
//       </Button>
//     </form>
//   );
  export function SignOut(props: React.ComponentPropsWithRef<typeof Button>) {
    const handleSignOut = async () => {
      console.log("SIGNING-OUT")
      await signOut({ redirect: false }) // Prevents automatic redirection after sign out
      location.reload()
    }

    return (
      <Button variant="ghost" className="w-full p-0" onClick={handleSignOut} {...props}>
        Sign Out
      </Button>
    )
  }