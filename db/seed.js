const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const sampleData = {
    data: {
        username: "sample",
        name: 'Sample User',
        email: 'sampleuser@example.com',
        password: 'password',
        folders: {
            create: {
                name: 'SampleFolder',
                files: {
                    create: {
                        name: 'SampleFile',
                        fileType: 'pdf',
                    }
                }
            }
        }
    },
}

async function createSample() {
    try {
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