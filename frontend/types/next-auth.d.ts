import { DefaultSession } from "next-auth"
import { GithubProfile } from 'next-auth/providers/github';

declare module "next-auth" {
  interface Session {
    user: {
      username?: string | null
    } & DefaultSession["user"]
    error?: string | null
    accessToken?: string | null
  }

  interface Profile extends GithubProfile {
    login: string
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    accessToken?: string | null
    refreshToken?: string | null
    accessTokenExpires?: number
    username?: string | null
    error?: string | null
  }
}
