import supabase from '../db/supabase.js';
import {insertFile} from '../db/queries.js';

// Controller functions
function renderUpload(req, res) {
    res.render('upload', {
        csrfToken: req.csrfToken()
    });
}

async function postUpload(req, res) {
  const file = req.file;
  
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

    res.json({ 
      success: true, 
      url: publicUrl 
    });

    await insertFile({
      name: file.originalname,
      fileType: file.mimetype,
      url: publicUrl,
      folderId: 1 
    });
    
    console.log('File uploaded successfully:', file.originalname);
    console.log('File URL:', publicUrl);

  } catch (error) {
    console.error('FINAL UPLOAD ERROR:', error);
    res.status(500).send(`Upload failed: ${error.message}`);
  }
}

export { postUpload, renderUpload };