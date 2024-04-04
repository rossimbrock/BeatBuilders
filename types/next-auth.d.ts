import NextAuth from "next-auth"

declare module "next-auth" {
  interface Session {
    user:{
      access_token: any & DefaultSession["user"];
    }
  }

  interface User {
      access_token: any
     & DefaultSession["user"];
  }
}