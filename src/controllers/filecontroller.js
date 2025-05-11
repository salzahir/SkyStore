import * as fileDb from '../db/queries/file.js';
import { devLog } from '../utils/devlog.js';

async function handleDeleteFile(req, res) {
    const fileId = req.body.fileId;
    try {
        await fileDb.deleteFile(fileId);
        devLog("File deleted:", fileId);
        res.redirect('/dashboard');
    } catch (error) {
        console.error("Error deleting file:", error);
        res.status(500).send('Error deleting file');
    }
}

export {
    handleDeleteFile
}; 