import {getServerSession} from "next-auth";
import {authOptions} from "./auth/[...nextauth]";
import {NextApiRequest, NextApiResponse} from "next";

export default async function repositoriesHandler(req: NextApiRequest, res: NextApiResponse) {
  const session: any = await getServerSession(req as any, res as any, authOptions as any);

  const repositories = await fetch(session?.user ? `https://api.github.com/users/${session.user.username}/repos?per_page=6` : 'https://api.github.com/orgs/pixel8labs/repos?per_page=6')
    .then(res => res.json())

  res.status(200).json(repositories || [])
}
