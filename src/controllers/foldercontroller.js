import * as folderDB from "../db/queries/folder.js";

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

async function handleGetUserFolders(req, res) {
    const userId = req.session.user.id;
    try {
        const folders = await folderDB.getUserFolders(userId);
        res.status(200).json({ folders });
    } catch (error) {
        console.error("Error fetching user folders:", error);
        res.status(500).json({ message: "Error fetching user folders" });
    }
}

export { handleCreateFolder, handleGetUserFolders };