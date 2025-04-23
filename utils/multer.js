// Taken straight from the multer documentation
// modified to use originalname as filename

const multer = require('multer');
const path = require('path');
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, '..', 'uploads'));
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname); 
      }
  })

const upload = multer({ storage: storage })
module.exports = upload