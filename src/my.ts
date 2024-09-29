import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function insertUser(username: string, password: string, firstName: string, lastName: string) {
    const res = await prisma.user.create({
        data: {
            username,
            password,
            firstName,
            lastName
        }
    });
    console.log(res);
}
// insertUser("admin2", "123456", "user2", "enc");

// Update
interface UpdateParams {
    firstName: string;
    lastName: string;
}

async function updateUser(username: string, { firstName, lastName }: UpdateParams) {
    const res = await prisma.user.update({
        where: { username },
        data: {
            firstName,
            lastName
        }
    });
    console.log(res);
}

// updateUser("admin2", {
//     firstName: "user2",
//     lastName: "hacker"
// });

// Select One
async function getUser(username: string) {
    const user = await prisma.user.findFirst({
        where: {
            username: username
        }
    });
    console.log(user);
}
//   getUser("admin2");

// Select All
async function getUsers() {
    const users = await prisma.user.findMany();
    console.log('All users: ', users);
}
getUsers();

// Delete
async function deleteUser(username: string) {
    const user = await prisma.user.delete({
        where: {
            username
        }
    })
    console.log('User deleted success ', user);
}
// deleteUser("admin2");
