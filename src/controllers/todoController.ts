import { PrismaClient } from '@prisma/client';
import { z } from 'zod';

const prisma = new PrismaClient();

const todoSchema = z.object({
    title: z.string().min(5),
    description: z.string().min(1),
});

export const createTodo = async (req: any, res: any) => {
    try {
        const { title, description } = todoSchema.parse(req.body);
        const { userId } = req.user;

        const todo = await prisma.todo.create({
            data: {
                title,
                description,
                userId,
            },
        });

        res.status(201).json(todo);
    } catch (error: unknown) {
        if (error instanceof Error) {
            res.status(400).json({ error: error.message });
        } else {
            res.status(400).json({ error: 'An unknown error occurred' });
        }
    }
};

export const getTodos = async (req: any, res: any) => {
    try {
        const { userId } = req.user;
        const todos = await prisma.todo.findMany({ where: { userId } });
        res.json(todos);
    } catch (error: unknown) {
        if (error instanceof Error) {
            res.status(400).json({ error: error.message });
        } else {
            res.status(400).json({ error: 'An unknown error occurred' });
        }
    }
};
