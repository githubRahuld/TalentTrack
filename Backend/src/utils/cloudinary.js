import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadOnCloudinary = async (localFilePath) => {
    try {
        if (!localFilePath) {
            console.log("Could not find local file path");
            return null;
        }

        const response = await cloudinary.uploader.upload(localFilePath, {
            resource_type: "auto",
            folder: "/DEALSDRAY/employees",
        });

        // fs.unlinkSync(localFilePath);
        return response;
    } catch (error) {
        //remove the local temp file when uploader got failed
        fs.unlinkSync(localFilePath);
        console.log(error.message);

        return null;
    }
};

export const deleteImageFromCloudinary = async (avatarUrl) => {
    try {
        // Extract public ID from the URL (remove the extension)
        const publicId = avatarUrl.split("/").pop().split(".")[0]; // This extracts the image name without extension

        // Delete the image by its public ID
        await cloudinary.uploader.destroy(publicId);

        console.log(`Image ${publicId} successfully deleted`);
    } catch (error) {
        console.error("Error deleting image from Cloudinary:", error);
        throw new ApiError(500, "Failed to delete the image");
    }
};

export default uploadOnCloudinary;
