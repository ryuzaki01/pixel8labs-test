import {NextApiRequest, NextApiResponse} from "next";
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]';

// TODO: Move storage to database
const visitorCounter: Record<string, number> = {}
const visitors: Record<string, Visitor[]> = {}

export default async function userHandler(req: NextApiRequest, res: NextApiResponse) {
  const session: any = await getServerSession(req as any, res as any, authOptions as any);
  const headers = new Headers();

  if (session) {
    headers.append('Authorization', `token ${session.accessToken}`)
  }

  const user = await fetch(`https://api.github.com/users/${req.query.username}`, {
    headers
  }).then(res => res.json())

  if (!visitorCounter[req.query.username as string]) {
    visitorCounter[req.query.username as string] = 0;
  }

  if (!visitors[req.query.username as string]) {
    visitors[req.query.username as string] = []
  }

  if (session && `${req.query.username}` !== session?.user?.username) {
    const existingVisitor = visitors[req.query.username as string].find(f => f.username === session?.user?.username)

    if (!existingVisitor) {
      visitors[req.query.username as string].unshift({
        username: session.user.username,
        avatar: session.user.image
      })
    }
  }

  if (visitors[req.query.username as string].length > 3) {
    visitors[req.query.username as string].length = 3;
  }

  visitorCounter[req.query.username as string]++;
  user.visits = visitorCounter[req.query.username as string];
  user.visitors = visitors[req.query.username as string];
  res.status(200).json(user || null)
}
