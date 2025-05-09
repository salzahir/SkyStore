import supabase from '../db/supabase.js';
import { insertFile } from '../db/queries/file.js';
import { getUserFiles } from '../db/queries/file.js'
import { devLog } from '../utils/devlog.js';
import * as folderDb from '../db/queries/folder.js';

async function postUpload(req, res) {
  const file = req.file;
  const folderId = req.params.folderId || null;
  const currentFolder = folderId ? await folderDb.getFolderById(folderId) : null;

  // Validation
  if (!file || !file.buffer) {
    return res.status(400).send('No file or invalid file buffer');
  }

  if (!supabase.storage) {
    return res.status(500).send('Supabase storage not initialized');
  }

  const newFileName = `${Date.now()}_${file.originalname}`;

  try {
    const { error } = await supabase.storage
      .from('files')
      .upload(`public/${newFileName}`, file.buffer, {
        contentType: file.mimetype,
        upsert: false
      });

    if (error) throw error;

    const { data: { publicUrl } } = supabase.storage
      .from('files')
      .getPublicUrl(`public/${newFileName}`);

    const userId = req.session.user.id;
    await insertFile({
      name: file.originalname,
      fileType: file.mimetype,
      url: publicUrl,
      folderId: folderId,
      userID: userId
    });

    devLog('File uploaded successfully:', publicUrl);

    // Redirect back to the appropriate location
    if (folderId) {
      res.redirect(`/dashboard/folder/${folderId}?message=File uploaded successfully`);
    } else {
      res.redirect('/dashboard?message=File uploaded successfully');
    }

  } catch (error) {
    console.error('FINAL UPLOAD ERROR:', error);
    res.status(500).send(`Upload failed: ${error.message}`);
  }
}

export { postUpload };