import React, { useState, useRef } from "react";
import Webcam from "react-webcam";
import { predictImage } from "../api";
import "./Home.css";

function Home() {
    const [image, setImage] = useState(null);
    const [isCameraOpen, setIsCameraOpen] = useState(false);
    const [prediction, setPrediction] = useState(null);
    const webcamRef = useRef(null);

    const handleUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => setImage(e.target.result);
            reader.readAsDataURL(file);
        }
    };

    const capturePhoto = () => {
        if (webcamRef.current) {
            setImage(webcamRef.current.getScreenshot());
            setIsCameraOpen(false);
        }
    };

    const handlePredict = async () => {
        if (!image) return alert("กรุณาอัปโหลดหรือถ่ายรูปก่อน!");
        try {
            const result = await predictImage(image);
            setPrediction(`ผลลัพธ์: ${result.prediction}`);
        } catch (error) {
            console.error("Error during prediction:", error);
        }
    };

    return (
        <div className="app">
            <div className="upload-container">
                {isCameraOpen ? (
                    <div className="webcam-container">
                        <Webcam ref={webcamRef} screenshotFormat="image/jpeg" className="webcam" />
                        <button className="capture-button" onClick={capturePhoto}>📸 ถ่ายรูป</button>
                    </div>
                ) : image ? (
                    <img src={image} alt="Preview" className="preview-image" />
                ) : (
                    <div className="placeholder">🖼 ไม่มีรูปภาพ</div>
                )}
            </div>
            <div className="button-container">
                <input type="file" accept="image/*" id="upload-input" className="upload-input" onChange={handleUpload} />
                <label htmlFor="upload-input" className="upload-button">📤 อัปโหลดรูปภาพ</label>
                <button className="camera-button" onClick={() => setIsCameraOpen(true)}>📷 เปิดกล้อง</button>
                <button className="predict-button" onClick={handlePredict}>🔍 วิเคราะห์รูปภาพ</button>
            </div>
            {prediction && <div className="prediction-result">{prediction}</div>}
        </div>
    );
}

export default Home;
