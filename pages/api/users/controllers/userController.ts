import { NextApiRequest, NextApiResponse } from 'next';
import { createUser, findUserByUsername } from '../models/userModel';
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const JWT_SECRET = 'your_jwt_secret';

export const registerUser = async (req: NextApiRequest, res: NextApiResponse) => {
    const { username, password } = req.body;
    try {
        await createUser(username, password);
        res.status(201).json({ message: 'User created successfully' });
    } catch (error) {
        console.error('Error registering user:', error);
        res.status(500).json({ error: 'Failed to register user' });
    }
};

export const loginUser = async (req: NextApiRequest, res: NextApiResponse) => {
    const { username, password } = req.body;
    try {
        const user = await findUserByUsername(username);
        if (!user) {
            return res.status(401).json({ error: '存在しないユーザーです。' });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ error: 'パスワードが異なります。' });
        }

        const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: '1h' });
        res.status(200).json({ token });
    } catch (error) {
        console.error('Error logging in user:', error);
        res.status(500).json({ error: 'Failed to log in user' });
    }
};