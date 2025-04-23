// Controller functions
function renderUpload(req, res) {
    res.render('upload', {
        csrfToken: req.csrfToken()
    });
}

function postUpload(req, res) {
    const file = req.file;
    if (!file) {
        return res.status(400).send('No file uploaded.');
    }
    console.log('File uploaded:', file);
    res.send('File uploaded successfully.');
}

module.exports = {
    renderUpload,
    postUpload
};