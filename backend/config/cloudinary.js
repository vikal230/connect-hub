import { v2 as cloudinary } from "cloudinary";
export const uploadCloudinary = async (file) => {
  try {
    cloudinary.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
    });

    if (!file || !file.buffer) {
      throw new Error("File buffer not found");
    }

    const mediaUrl = await new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        {
          resource_type: "auto",
        },
        (error, result) => {
          if (error) {
            return reject(error);
          }

          resolve(result.secure_url);
        },
      );

      stream.end(file.buffer);
    });

    return mediaUrl;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
