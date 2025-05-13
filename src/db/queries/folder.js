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

async function getChildrenFolders(folderId) {
    try {
        const folders = await prisma.folder.findMany({
            where: {
                parentId: folderId
            }
        });
        return folders;
    } catch (error) {
        console.error("Error fetching children folders:", error);
    }
}

async function deleteFolder(folderId) {
    try {
        const folder = await prisma.folder.delete({
            where: {
                id: folderId
            }
        });
        return folder;
    } catch (error) {
        console.error("Error deleting folder:", error);
    }
}


async function renameFolder(folderId, newName) {
    try {
        const folder = await prisma.folder.update({
            where: {
                id: folderId
            },
            data: {
                name: newName
            }
        });
        return folder;
    } catch (error) {
        console.error("Error renaming folder:", error);
    }
}

async function shareFolder(folderId, userId) {
    try {
        const folder = await prisma.folder.update({
            where: {
                id: folderId
            },
            data: {
                sharedWith: {
                    connect: { id: userId }
                }
            }
        });
        return folder;
    } catch (error) {
        console.error("Error sharing folder:", error);
    }
}

async function getSharedFolders(userId) {
    try {
        const folders = await prisma.folder.findMany({
            where: {
                sharedWith: {
                    some: {
                        id: userId
                    }
                }
            }
        });
        return folders;
    } catch (error) {
        console.error("Error fetching shared folders:", error);
    }
}

export {
    createFolder,
    getUserFolders,
    getFolderById,
    getChildrenFolders,
    deleteFolder,
    renameFolder,
    shareFolder,
    getSharedFolders
}