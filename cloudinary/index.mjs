import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import multer from 'multer';

cloudinary.config({
  cloud_name : process.env.CLOUD_NAME,
  api_key : process.env.CLOUD_KEY ,
  api_secret : process.env.CLOUD_SECRET
})

//cloudinary.image("sample.jpg", { transformation: { width: 400, crop: "pad" }})

const storage = new CloudinaryStorage({
  cloudinary : cloudinary,
  params : {
    folder : (req,file) => {
      const folderpath = 'meinkampf';
      return folderpath;
    },

    format: async (req, file) => {
      const fileExtension = file.originalname.split('.').pop().toLowerCase();
      const allowedFormats = ['jpeg', 'png', 'jpg'];

      if (allowedFormats.includes(fileExtension)) {
        return fileExtension;
      } else {
        throw new Error('Invalid file format');
      }
    },
    transformation: [{ width: 500, height: 500, crop: 'limit' }], 
    //public_id: (req, file) => 'computed-filename-using-request',
    public_id: (req, file) => {
      return file.filename; // Use the filename provided by Multer
    },
  }
});

//const storage = multer.memoryStorage()

export {cloudinary,storage}



