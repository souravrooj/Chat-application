import { Request, Response } from 'express';
import User from '../models/user';

export const getUser = async (req: Request, res: Response): Promise<void> => {
    try {
        const { email } = req.params;
        const user = await User.findOne({ email });
        if (!user) {
            res.status(404).json({ message: 'User not found' });
            return; // Ensure void return
        }
        res.json(user);
    } catch (err) {
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

export const addUser = async (req: Request, res: Response): Promise<void> => {
    try {
        const { email, name } = req.body;
        const newUser = new User({ email, name });
        await newUser.save();
        res.status(201).json(newUser);
    } catch (err) {
        res.status(500).json({ message: 'Internal Server Error' });
    }
};
