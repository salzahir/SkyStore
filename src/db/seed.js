import prisma from "./queries/prisma.js";
import { v4 as uuidv4 } from 'uuid'; 
import { hashPassword } from '../utils/hash.js';

const sampleData = {
    data: {
        username: "sample",
        name: 'Sample User',
        email: 'sampleuser@example.com',
        password: "",
        id: uuidv4()
    }, 
};

async function createSample() {
    try {
        const samplePass = 'password';
        const hashedPass = await hashPassword(samplePass);
        sampleData.data.password = hashedPass;

        console.log("Seeding database...");
        await prisma.user.create(sampleData);
        const allUsers = await prisma.user.findMany();
        console.log(allUsers);
        console.log("Database seeded successfully!");
    } catch (error) {
        console.error("Error seeding database:", error);
        throw error;
    } 
}

async function seedDataBase() {
    try {
        await prisma.$connect();
        await createSample();
    } catch (error) {
        console.error('Error in seedDataBase:', error);
        throw error;
    } finally {
        await prisma.$disconnect();
        console.log("Disconnected from the database.");
    }
}

seedDataBase();