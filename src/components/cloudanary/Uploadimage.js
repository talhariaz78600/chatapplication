
import axios from "axios";
const cloudName = 'da6yuh11g'; 
const uploadPreset = 'g6k9owtj'; 

 export const handleImageSelect = async (filename) => {
    const file = filename;
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', uploadPreset);
    formData.append('folder', 'profilepicture');
    try {
        const response = await axios.post(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, formData); 
            console.log("upload")
         return response.data.secure_url
    } catch (error) {
        console.error('Error uploading image:', error);
        return "";
    }
};