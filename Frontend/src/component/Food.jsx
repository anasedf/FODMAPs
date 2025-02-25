import React, { useState, useRef } from "react";
import Webcam from "react-webcam";
import { predictImage } from "../api";
import "./test.css";

function Food() {
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
    <section id='card'>

      <div className='head'>
        <h1>Fodmaps</h1>
      </div>

      <div className='picture'>
        {!image ? (
          <div className="placeholder">ไม่มีรูปภาพ</div>
        ) : (
          <img src={image} alt="Uploaded preview" className="preview-image" />
        )}
      </div>

      <div className="but">
        <button className="predict-button" onClick={handlePredict}>Predict</button>
        <input type="file" accept="image/*" id="upload-input" onChange={handleUpload} />
        <label htmlFor="upload-input" className="upload-button">Upload Image</label>
      </div>

      <div className="result">
        <div className="predict">
          {prediction ? (
            <p>{prediction}</p>
          ) : ""}
        </div>
        <div className="class" style={{ backgroundColor: fodmap === "low" ? "green" : fodmap === "high" ? "red" : "gray" }}>
          {prediction ? (
            <p>{fodmap} - FODMAPs</p>
          ) : "?????"}
        </div>
      </div>



    </section>
  )
}

export default Food