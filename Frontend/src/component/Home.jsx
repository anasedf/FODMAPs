import React, { useState, useRef } from "react";
import Webcam from "react-webcam";
import { predictImage } from "../api";
import "./Home.css";

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
          <div className="pic_text">ไม่มีรูปภาพ</div>
        ) : (
          <img src={image} className="pic_pre" />
        )}
      </div>

      <div className="but">
        <button className="predict_but" onClick={handlePredict}>Predict</button>
        <input type="file" accept="image/*" id="upload-input" onChange={handleUpload} />
        <label htmlFor="upload-input" className="upload_but">Upload Image</label>
      </div>

      <div className="result">
        <div className="predict">
          {prediction ? (
            <p>{prediction}</p>
          ) : ""}
        </div>
        <div className={`class ${fodmap || 'moderate'}`}>
          {prediction ? (
            <p>{fodmap.toUpperCase()} - FODMAPs</p>
          ) : "?????"}
        </div>
        {fodmap === "low" && (
          <div className="description">
            <p>อาหารประเภท Low FODMAPs สามารถทานได้สำหรับผู้ที่มีภาวะลำไส้แปรปรวน (IBS)</p>
          </div>
        )}
        {fodmap === "high" && (
          <div className="description">
            <p>อาหารประเภท High FODMAPs อาจทำให้อาการลำไส้แปรปรวนแย่ลง</p>
          </div>
        )}
      </div>



    </section>
  )
}

export default Food