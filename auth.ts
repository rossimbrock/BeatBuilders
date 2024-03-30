import NextAuth from "next-auth"
import Spotify from "next-auth/providers/spotify"
import type { NextAuthConfig } from "next-auth"

export const config = {
  theme: {
    logo: "https://next-auth.js.org/img/logo/logo-sm.png",
  },
  providers: [
    // Apple,
    Spotify({
      authorization: "https://accounts.spotify.com/authorize?scope=user-read-email,playlist-modify-private,playlist-modify-public",
    }),
  ],
  callbacks: {
    authorized({ request, auth }) {
      const { pathname } = request.nextUrl
      if (pathname === "/middleware-example") return !!auth
      return true
    },
    async jwt({ token, account, profile }) {

      if (account) {
        token.accessToken = account.access_token;
      }

      return token
    },
    async session({ session, token, user }) {
      // Send properties to the client, like an access_token and user id from a provider.
      session.user.access_token = token.accessToken
      
      return session
    }
  },
} satisfies NextAuthConfig

export const { handlers, auth, signIn, signOut } = NextAuth(config)
