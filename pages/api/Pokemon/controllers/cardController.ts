/**
 * cardController.ts
 * 
 * このファイルは、カードに関連するAPIエンドポイントのロジックを定義するコントローラーファイルです。
 * クライアントからのリクエストを処理し、データベースからデータを取得してレスポンスを返します。
 * 
 * 関数:
 * - getAllCards: 全てのカードを取得し、クライアントに返します。
**/
import { NextApiRequest, NextApiResponse } from 'next';
import { getAllCardNamesWithImagesFromDB } from '../model/cardModel';

/**
 * 全てのカードを取得
 * 
 * @param req - Next.jsのリクエストオブジェクト
 * @param res - Next.jsのレスポンスオブジェクト
 */
const getAllCardNamesWithImages = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        const cards = await getAllCardNamesWithImagesFromDB();
        res.status(200).json(cards);
    } catch (error) {
        console.error('Error fetching card names and images:', error);
        res.status(500).json({ error: 'Failed to fetch card names and images', details: error.message });
    }
};

export default getAllCardNamesWithImages;