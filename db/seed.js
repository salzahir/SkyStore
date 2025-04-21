const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();


async function main() {

    await prisma.user.create(
        {
            data: {
                username: "salzahir",
                name: 'Salman',
                email: 'salzahir18@gmail.com',
                password: 'prisma25',
                folders : {
                    create: {
                        name: 'CSCI1933',
                        files: {
                            create: {
                                name: 'HW2',
                                fileType: 'pdf',
                            }
                        }
                    }
                }
            },
        }
    )
    const allUsers = await prisma.user.findMany()
    console.log(allUsers);
}


(async () => {
    try {
        await main();
    } catch (error) {
        console.error('Error in main function:', error);
        process.exit(1);
    } finally {
        await prisma.$disconnect();
    }
})();