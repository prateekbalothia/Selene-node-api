const multer = require('multer')
const path = require('path')

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const uploadPath = path.join(process.cwd(),"public/uploads");
        cb(null, uploadPath)
    },
    filename: function (req, file, cb) {
        cb(null, Date.now()  + path.extname(file.originalname));
    }
})
const upload = multer({storage:storage}).single("upload_image")


module.exports = {upload};