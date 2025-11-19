import { diskStorage } from 'multer';
export const multerOptions =(destination)=> {
const storage = diskStorage({
    destination:'./src/uploads/brands',
    filename: function (req, file, cb) {
    const uniqueFilename = Date.now() + '-' + file.originalname;
    cb(null, uniqueFilename);
}
})
return storage
}