import { NextApiRequest, NextApiResponse } from 'next';
import { registerUser } from '../controllers/userController';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        await registerUser(req, res);
    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}