import { devLog } from "../../utils/devlog.js";
import prisma from "./prisma.js";

async function createFolder(name, userId, userName, user) {
    try {
        const folder = await prisma.folder.create({
            data: {
              name,
              userId,         
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

export {
    createFolder,
    getUserFolders
}