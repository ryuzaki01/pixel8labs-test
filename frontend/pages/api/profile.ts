import {unstable_getServerSession} from "next-auth/next";
import {authOptions} from "./auth/[...nextauth]";
import {NextApiRequest, NextApiResponse} from "next";

export default async function profileHandler(req: NextApiRequest, res: NextApiResponse) {
  const session: any = await unstable_getServerSession(req as any, res as any, authOptions as any);

  if (!session) {
    return res.json({
      status: 'ERROR',
      code: 408,
      message: 'Invalid session, please reconnect'
    })
  }

  res.status(200).json(session?.user || null)
}
