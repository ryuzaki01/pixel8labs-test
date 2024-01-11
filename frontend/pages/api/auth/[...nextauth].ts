import { NextApiRequest, NextApiResponse } from 'next';
import NextAuth, {NextAuthOptions} from 'next-auth'
import GitHubProvider  from 'next-auth/providers/github'
import { JWT } from 'next-auth/jwt';
import { setParams } from 'utils/url';

async function refreshAccessToken(token: JWT) {
  try {
    const url = new URL('/login/oauth/access_token', 'https://github.com')
    setParams(url, {
      client_id: process.env.GITHUB_ID,
      client_secret: process.env.GITHUB_SECRET,
      grant_type: "refresh_token",
      refresh_token: token.refreshToken,
    })

    const response = await fetch(url, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      method: "POST",
    })

    const refreshedTokens = await response.json()

    if (!response.ok) {
      throw refreshedTokens
    }

    return {
      ...token,
      accessToken: refreshedTokens.access_token,
      accessTokenExpires: Date.now() + refreshedTokens.expires_in * 1000,
      refreshToken: refreshedTokens.refresh_token ?? token.refreshToken, // Fall back to old refresh token
    }
  } catch (error) {
    console.log(error)

    return {
      ...token,
      error: "RefreshAccessTokenError",
    }
  }
}

export const authOptions: NextAuthOptions = {
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
      authorization: {
        url: "https://github.com/login/oauth/authorize",
        params: { scope: "read:user user:email read:project read:repo" },
      },
      profile(profile) {
        return {
          id: profile.id.toString(),
          name: profile.name ?? profile.login,
          email: profile.email,
          image: profile.avatar_url,
          username: profile.login,
          bio: profile.bio,
          followers: profile.followers,
          following: profile.following
        }
      }
    }),
  ],
  session: {
    maxAge: 60 * 60 * 4,
  },
  jwt: {
    secret: process.env.JWT_SECRET,
    maxAge: 60 * 60 * 4,
  },
  callbacks: {
    async signIn({ user, profile}) {
      return true
    },
    async jwt({ token, user, account, profile }) {
      if (profile) {
        token.username = profile.login;
      }

      if (account && user) {
        return {
          ...token,
          accessToken: account.access_token,
          refreshToken: account.refresh_token,
          accessTokenExpires: account.expires_at ? account.expires_at * 1000 : (new Date()).getTime(),
        }
      }

      // Return previous token if the access token has not expired yet
      if (Date.now() < (token.accessTokenExpires || 0)) {
        return token
      }

      // Access token has expired, try to update it
      return refreshAccessToken(token)
    },
    async session({ session, user, token }) {
      session.accessToken = token.accessToken ?? null
      session.error = token.error;
      session.user.username = token.username

      return session
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};

export default async function auth(req: NextApiRequest, res: NextApiResponse) {
  return await NextAuth(req, res, authOptions);
}
