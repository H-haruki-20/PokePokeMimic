import * as mysql from "promise-mysql";
import * as bcrypt from "bcrypt";

const dbConfig = {
    host: "localhost",
    user: "root",
    password: "hrk2000325",
    database: "poke_poke_mimic",
};

export const createUser = async (userName: string, password: string): Promise<void> => {
    const hashedPassword = await bcrypt.hash(password,10);
    let connection;

    try{
        connection = await mysql.createConnection(dbConfig);
        await connection.query("INSERT INTO Users (userName, password) VALUES (?,?)", [userName, hashedPassword]);
    }
    catch (error) {
        console.error('Error creating user:', error);
        throw new Error('Failed to create user');
    } 
    finally {
        if (connection) {
            await connection.end();
        }
    }
};

export const findUserByUsername = async (username: string): Promise<any> => {
    let connection;
    try {
        connection = await mysql.createConnection(dbConfig);
        const rows = await connection.query('SELECT * FROM Users WHERE username = ?', [username]);
        return rows[0];
    } catch (error) {
        console.error('Error finding user:', error);
        throw new Error('Failed to find user');
    } finally {
        if (connection) {
            await connection.end();
        }
    }
};