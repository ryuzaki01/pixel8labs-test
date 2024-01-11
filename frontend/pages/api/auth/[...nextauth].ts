import { NextApiRequest, NextApiResponse } from 'next';
import NextAuth, {NextAuthOptions} from 'next-auth'
import GitHubProvider  from 'next-auth/providers/github'

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

      if (account) {
        token.accessToken = account.access_token;
        token.idToken = account.id_token;
        token.oktaId = account.providerAccountId;
      }

      return token
    },
    async session({ session, user, token }) {
      session.accessToken = token.accessToken ?? null
      session.user.username = token.username

      return session
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};

export default async function auth(req: NextApiRequest, res: NextApiResponse) {
  return await NextAuth(req, res, authOptions);
}
