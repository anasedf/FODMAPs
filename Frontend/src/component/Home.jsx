import React, { useState, useRef } from "react";
import Webcam from "react-webcam";
import { predictImage } from "../api";
import "./Home.css";

function Home() {
    const [image, setImage] = useState(null);
    const [isCameraOpen, setIsCameraOpen] = useState(false);
    const [prediction, setPrediction] = useState(null);
    const [fodmap, setFodmap] = useState(null);
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
            setPrediction(result.prediction);
            setFodmap(result.fodmap);
        } catch (error) {
            console.error("Error during prediction:", error);
        }
    };

    return (
        <div className="app">
            <h2 className="title">🍏 AI ตรวจสอบ FODMAP</h2>
            <div className="upload-section">
                {!image ? (
                    <div className="upload-options">
                        <input type="file" accept="image/*" id="upload-input" onChange={handleUpload} />
                        <label htmlFor="upload-input" className="upload-button">📤 อัปโหลดรูป</label>
                        <button className="camera-button" onClick={() => setIsCameraOpen(true)}>📷 เปิดกล้อง</button>
                    </div>
                ) : (
                    <img src={image} alt="Uploaded preview" className="preview-image" />
                )}

                {isCameraOpen && (
                    <div className="webcam-container">
                        <Webcam ref={webcamRef} screenshotFormat="image/jpeg" className="webcam" />
                        <button className="capture-button" onClick={capturePhoto}>📸 ถ่ายรูป</button>
                    </div>
                )}
            </div>

            <div className="result-section">
                <h3>🔍 ผลลัพธ์</h3>
                <div className="result-box">
                    {prediction ? (
                        <p>ประเภทอาหาร: {prediction} <br /> FODMAP: {fodmap || "ไม่ระบุ"}</p>
                    ) : "รอผลลัพธ์..."}
                </div>
            </div>

            {image && <button className="predict-button" onClick={handlePredict}>🔍 วิเคราะห์</button>}
        </div>
    );
}

export default Home;
