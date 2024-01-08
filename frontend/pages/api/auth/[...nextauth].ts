import { NextApiRequest, NextApiResponse } from 'next';
import NextAuth, {NextAuthOptions} from 'next-auth'
import GitHubProvider from 'next-auth/providers/github'

export const authOptions: NextAuthOptions = {
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
      authorization: {
        url: "https://github.com/login/oauth/authorize",
        params: { scope: "read:user user:email read:project" },
      },
      profile(profile, tokens) {
        return {
          id: profile.id.toString(),
          name: profile.name ?? profile.login,
          email: profile.email,
          image: profile.avatar_url,
          username: profile.login,
          bio: profile.bio
        }
      }
    }),
  ],
  callbacks: {
    async jwt({ token, user, account, profile, isNewUser }) {
      if (profile) {
        // @ts-ignore
        user.username = profile?.username
        // @ts-ignore
        user.bio = profile?.bio
      }

      return token
    }
  },
  secret: process.env.NEXTAUTH_SECRET,
};

export default async function auth(req: NextApiRequest, res: NextApiResponse) {
  return await NextAuth(req, res, authOptions);
}
