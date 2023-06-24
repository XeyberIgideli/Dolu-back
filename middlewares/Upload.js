import multer from 'multer' 

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "public/uploads/movies");
    },
    
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, file.fieldname + '-' + uniqueSuffix + '.' + file.mimetype.substr(6))
    },
});
const upload = multer({ storage: storage }); 

export default upload