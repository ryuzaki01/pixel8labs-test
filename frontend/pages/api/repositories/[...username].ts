import {NextApiRequest, NextApiResponse} from "next";
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]';

export default async function repositoriesHandler(req: NextApiRequest, res: NextApiResponse) {
  const session: any = await getServerSession(req as any, res as any, authOptions as any);
  const headers = new Headers();

  if (session) {
    headers.append('Authorization', `token ${session.accessToken}`)
  }

  let repositories = await fetch(
    `https://api.github.com/users/${req.query.username}/repos?per_page=6&sort=updated_at`,
    {
      headers
    }
  ).then(res => res.json())

  if (repositories.message) {
    repositories = []
  }

  res.status(200).json(repositories || [])
}
