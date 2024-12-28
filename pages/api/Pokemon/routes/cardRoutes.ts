import { NextApiRequest, NextApiResponse } from 'next';
import getAllCardNamesWithImages from '../controllers/cardController';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'GET') {
        await getAllCardNamesWithImages(req, res);
    } else {
        res.setHeader('Allow', ['GET']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}