import multer from "multer";

// This is a configuration object for multer, which is a middleware used to handle multipart/form-data requests.
// We're using the diskStorage engine to store the uploaded files on the server's disk.
const storage = multer.diskStorage({
  filename: (req, file, callback) => {
    callback(null, `${Date.now()}-${file.originalname}`);
  },
});

// This is the middleware function that will be used to handle the upload.
// It takes a single parameter, which is an object that specifies which fields in the request should be processed.
// In this case, we're specifying that we want to process four fields: image1, image2, image3, and image4.
const upload = multer({ storage });

export default upload;

// Explanation ->
// This function is called for each file that is uploaded, and it determines the filename for the file.
// The function takes three parameters: the request object, the file object, and a callback function.
// The callback function takes two parameters: an error object (which should be null if everything is okay), and the filename that should be used for the file.

// We're simply using the original filename for the uploaded file.
// This is not a good idea in a real application, as it can lead to filename collisions.
// In a real application, you should generate a unique filename for each file.
