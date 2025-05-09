import { devLog } from "../../utils/devlog.js";
import prisma from "./prisma.js";

async function createFolder(name, userId, parentId = null) {
    try {
        const folder = await prisma.folder.create({
            data: {
              name,
              userId,
              parentId         
            }
          });
        devLog("Folder created:", folder);
        return folder;
    } catch (error) {
        console.error("Error creating folder:", error);
    }
}

async function getUserFolders(userId) {
    try {
        const folders = await prisma.folder.findMany({
            where: {
                userId: userId
            }
        });
        return folders;
    } catch (error) {
        console.error("Error fetching user folders:", error);
    }
}   

async function getFolderById(folderId) {
    try {
        const folder = await prisma.folder.findUnique({
            where: {
                id: folderId
            }
        });
        if (!folder) {
            console.log(`Folder with ID: ${folderId} not found`);
            return null;
        }
        return folder;
    } catch (error) {
        console.error("Error fetching folder:", error);
    }
}

export {
    createFolder,
    getUserFolders,
    getFolderById
}