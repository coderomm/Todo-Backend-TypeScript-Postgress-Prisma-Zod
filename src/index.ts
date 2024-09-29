import express from 'express';
import { PrismaClient } from '@prisma/client';

import userRoutes from './routes/userRoutes';
import todoRoutes from './routes/todoRoutes';

const prisma = new PrismaClient();
const app = express();
const PORT = 3000;

app.use(express.json())
app.use('/users', userRoutes);
app.use('/todos', todoRoutes);

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});