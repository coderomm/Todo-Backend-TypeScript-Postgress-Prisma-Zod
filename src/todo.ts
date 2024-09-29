import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function createTodo(userId: number, title: string, description: string) {
    const todo = await prisma.todo.create({
        data: {
            title, description, userId
        }
    });
    console.log('todo: ', todo)
}
createTodo(1, "go to coding setup", "go to coding setup and print Hello world");

async function getTodos(userId: number) {
    const todos = await prisma.todo.findMany({
        where: {
            userId: userId
        }
    })
    console.log('todos - ', todos)
}
getTodos(1);

async function getTodosAndUserDetails(userId: number,) {
    const user = await prisma.user.findUnique({
        where: {
            id: userId
        }
    })
    const todos = await prisma.todo.findMany({
        where: {
            userId: userId
        }
    })
    const data = { user, todos }
    console.log('data - ', data)

    const joinData = await prisma.todo.findMany({
        where: {
            userId: userId
        },
        select: {
            user: true,
            title: true,
            description: true
        }
    })
    console.log('joindata - ', joinData)
}

getTodosAndUserDetails(1);