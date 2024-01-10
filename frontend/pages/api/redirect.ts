import { getServerSession } from "next-auth";
import {authOptions} from "./auth/[...nextauth]";
import {NextApiRequest, NextApiResponse} from "next";

export default async function profileHandler(req: NextApiRequest, res: NextApiResponse) {
  const session: any = await getServerSession(req as any, res as any, authOptions as any);

  if (session) {
    return res.redirect(307, `/${session.user.username}`)
  }

  res.status(200).json( null)
}
