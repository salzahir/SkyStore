import * as folderDB from "../db/queries/folder.js";
import * as userDB from "../db/queries/user.js";
import { devLog } from "../utils/devlog.js";
import { sendSharedFolderEmail } from "../services/resend.js";

async function handleCreateFolder(req, res) {
    const user = req.session.user;
    const userId = user.id;

    try {
        const folder = await folderDB.createFolder("NewFolder", userId);
        res.status(201).json({ message: "Folder created successfully", folder });
    } catch (error) {
        console.error("Error creating folder:", error);
        res.status(500).json({ message: "Error creating folder" });
    }
}

async function handleDeleteFolder(req, res) {
    const folderId = req.body.folderId;
    try {
        await folderDB.deleteFolder(folderId);
        devLog("Folder deleted:", folderId);
        res.redirect('/dashboard?message=Folder deleted successfully');
    } catch (error) {
        console.error("Error deleting folder:", error);
        res.status(500).json({ message: "Error deleting folder" });
    }
}

async function handleFolderRename(req, res) {
    const folderId = req.body.folderId;
    const newName = req.body.newFolderName;
    try {
        const folder = await folderDB.renameFolder(folderId, newName);
        res.redirect(`/dashboard/folder/${folderId}?message=Folder renamed successfully`);
        devLog("Folder renamed:", folder);
    } catch (error) {
        console.error("Error renaming folder:", error);
        res.status(500).json({ message: "Error renaming folder" });
    }
}

async function handleShareFolder(req, res) {
    const { folderId, email } = req.body;
    try {
        const user = await userDB.getUserByEmail(email);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        const userId = user.id;
        await folderDB.shareFolder(folderId, userId);
        sendSharedFolderEmail(email, folderId);
        devLog("Folder shared with user:", email);
        res.redirect(`/dashboard/folder/${folderId}?message=Folder shared successfully`);
        devLog("Folder shared:", user);
    } catch (error) {
        console.error("Error sharing folder:", error);
        res.status(500).json({ message: "Error sharing folder" });
    }
}


export { handleCreateFolder, handleDeleteFolder, handleFolderRename, handleShareFolder };