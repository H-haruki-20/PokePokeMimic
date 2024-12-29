import { NextApiRequest, NextApiResponse } from 'next';
import { loginUser } from '../controllers/userController';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    await loginUser(req, res);
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}