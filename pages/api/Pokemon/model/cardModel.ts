/*
==============================
データベースの操作を行うモデル
==============================
*/
import * as mysql from 'promise-mysql';
import axios from 'axios';

const BASE_URL: string = "https://pokeapi.co/api/v2/";

// データベース接続設定
const dbConfig = {
    host: 'localhost',
    user: 'root',
    password: 'hrk2000325',
    database: 'poke_poke_mimic'
};

// 全てのカードを取得
export const getAllCardsFromDB = async (): Promise<any[]> => {
    let connection;
    try {
        connection = await mysql.createConnection(dbConfig);
        const rows = await connection.query('SELECT name, english_name FROM Cards');
        return rows;
    } catch (error) {
        console.error('Error fetching cards from database:', error);
        throw new Error('Failed to fetch cards from database');
    } finally {
        if (connection) {
            await connection.end();
        }
    }
};

/*
Poke APIからポケモンの画像URLを取得
*/
const getPokemonImageUrl = async (pokemonName: string): Promise<string> => {
    try {
        const response = await axios.get(`${BASE_URL}pokemon/${pokemonName.toLowerCase()}`);
        return response.data.sprites.front_default;
    } catch (error) {
        console.error(`Error fetching image for ${pokemonName}:`, error);
        throw new Error(`Failed to fetch image for ${pokemonName}`);
    }
};

/*
全てのカードの名前と画像URLを取得
*/
export const getAllCardNamesWithImagesFromDB = async (): Promise<any[]> => {
    try {
        const cards = await getAllCardsFromDB();
        const cardsWithImages = await Promise.all(cards.map(async (card) => {
            const imageUrl = await getPokemonImageUrl(card.english_name);
            return { name: card.name, imageUrl };
        }));
        return cardsWithImages;
    } catch (error) {
        console.error('Error fetching card names and images:', error);
        throw new Error('Failed to fetch card names and images');
    }
};