import {NextApiRequest, NextApiResponse} from "next";

export default async function repositoriesHandler(req: NextApiRequest, res: NextApiResponse) {
  let repositories = await fetch(`https://api.github.com/users/${req.query.username}/repos?per_page=6`)
    .then(res => res.json())

  if (repositories.message) {
    repositories = []
  }

  res.status(200).json(repositories || [])
}
