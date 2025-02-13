import axios from "axios";

const API_BASE_URL = "http://127.0.0.1:5000"; // หรือ IP จริง

export const predictImage = async (imageBase64) => {
  try {
    const formData = new FormData();
    const blob = await (await fetch(imageBase64)).blob(); // แปลง Base64 เป็น Blob
    formData.append("file", blob, "image.jpg");

    const response = await axios.post(`${API_BASE_URL}/predict`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return response.data; // ส่งผลลัพธ์กลับไป
  } catch (error) {
    console.error("Error calling the API:", error);
    throw error;
  }
};
