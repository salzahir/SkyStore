import prisma from "./prisma.js";

async function insertFile({ name, fileType, url, folderId, userID }) {
    const file = await prisma.file.create({
        data: {
            name,
            fileType,
            url,
            folderId: folderId ?? null,
            userID
        }
    });
    return file;
}

async function getFiles() {
    try {
        console.log("Fetching all files...");
        const files = await prisma.file.findMany();
        console.log(`${files.length} files found`);
        return files;
    } catch (error) {
        console.error("Error fetching files:", error);
    }
}

async function getUserFiles(userId) {
    try {
        console.log(`Fetching files for user ID: ${userId}`);
        const files = await prisma.file.findMany({
            where: {
                userID: userId
            }
        });
        console.log(`${files.length} files found for user ID: ${userId}`);
        return files;
    } catch (error) {
        console.error("Error fetching user files:", error);
    }
}

async function getFileById(fileId) {
    try {
        console.log(`Fetching file with ID: ${fileId}`);
        const file = await prisma.file.findUnique({
            where: {
                id: fileId
            }
        });
        if (!file) {
            console.log(`File with ID: ${fileId} not found`);
            return null;
        }
        console.log(`File with ID: ${fileId} found`);
        return file;
    } catch (error) {
        console.error("Error fetching file:", error);
    }
}

async function deleteAllFiles() {
    try {
        console.log("Deleting all files...");
        const files = await prisma.file.deleteMany();
        console.log(`${files.count} files deleted`);
        return files;
    } catch (error) {
        console.error("Error deleting files:", error);
    }
}

async function deleteFile(fileId) {
    try {
        console.log(`Deleting file with ID: ${fileId}`);
        const file = await prisma.file.delete({
            where: {
                id: fileId
            }
        });
        console.log(`File with ID: ${fileId} deleted`);
        return file;
    } catch (error) {
        console.error("Error deleting file:", error);
    }
}

async function getFilesByFolderId(folderId) {
    try {
        console.log(`Fetching files for folder ID: ${folderId}`);
        const files = await prisma.file.findMany({
            where: {
                folderId: folderId
            }
        });
        console.log(`${files.length} files found for folder ID: ${folderId}`);
        return files;
    } catch (error) {
        console.error("Error fetching files by folder ID:", error);
    }
}

export {
    insertFile,
    getFiles,
    getUserFiles,
    deleteAllFiles,
    deleteFile,
    getFileById,
    getFilesByFolderId
}