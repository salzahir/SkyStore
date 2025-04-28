const { PrismaClient } = require('@prisma/client');
const { v4: uuidv4 } = require('uuid'); // UUID library
const { hashPassword } = require('../utils/hash'); // ES module import

const prisma = new PrismaClient();
const userId = uuidv4(); 

// First create the user
const user = await prisma.user.create({
    data: {
        username: "sample",
        name: 'Sample User',
        email: 'sampleuser@example.com',
        password: "",
        userId: userId
    }, create: {
        files: {
            create: {
                id: uuidv4(),
                name: 'SampleFile',
                fileType: 'pdf',
                url: 'https://example.com/samplefile.pdf',
                userID: userId
            }
        }
    }
});

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