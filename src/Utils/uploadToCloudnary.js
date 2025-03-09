export const uploadToCloudinary = async (pics) => {
    try {
        if (!pics) {
            console.log("No file selected");
            return null;
        }

        const data = new FormData();
        data.append('file', pics);
        data.append("upload_preset", "social_media");
        data.append("cloud_name", "dgoetlqbi");

        const res = await fetch("https://api.cloudinary.com/v1_1/dgoetlqbi/image/upload", {
            method: "POST",
            body: data,
        });

        if (!res.ok) {
            throw new Error(`Upload failed: ${res.statusText}`);
        }

        const fileData = await res.json();

        if (!fileData.url) {
            throw new Error("Upload successful but no URL returned");
        }

        return fileData.url.toString();
    } catch (error) {
        console.error("Error uploading to Cloudinary:", error);
        return null;
    }
};
