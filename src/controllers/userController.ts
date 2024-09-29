import { PrismaClient } from '@prisma/client';
import { z } from 'zod';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();

const userSignupSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
    firstName: z.string().min(3),
    lastName: z.string().min(3)
})

const userLoginSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),    
})

export const signup = async (req: any, res: any) => {
    try {
        const { email, password, firstName, lastName } = userSignupSchema.parse(req.body);

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await prisma.user.create({
            data: {
                username: email,
                password: hashedPassword,
                firstName,
                lastName
            },
        });
        res.status(201).json({ message: 'User created', user });
    } catch (error: unknown) {
        if (error instanceof Error) {
            res.status(400).json({ error: error.message });
        } else {
            res.status(400).json({ error: 'An unknown error occurred' });
        }
    }
}

export const login = async (req: any, res: any) => {
    try {
        const { email, password } = userLoginSchema.parse(req.body);

        const user = await prisma.user.findUnique({ where: { username: email } });
        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        const token = jwt.sign({ userId: user.id }, `${process.env.JWT}`);
        res.json({ message: 'Logged in', token });
    } catch (error: unknown) {
        if (error instanceof Error) {
            res.status(400).json({ error: error.message });
        } else {
            res.status(400).json({ error: 'An unknown error occurred' });
        }
    }
};