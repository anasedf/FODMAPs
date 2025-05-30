# Predict FODMAPs Web App

## 📝 Overview
Predict FODMAPs เป็นเว็บแอปที่ช่วยจำแนกผักและผลไม้โดยใช้ AI พร้อมให้ข้อมูลเกี่ยวกับ FODMAPs เพื่อช่วยผู้ที่มีภาวะลำไส้แปรปรวน (IBS)

## 📂 Project Structure

```
FODMAPS
│── Backend/        # ส่วนของ Backend (Flask API)
│   ├── api/
│   ├── models/
│   ├── upload_images/
│   ├── app.py      # Main backend file
│   ├── test.py     # Test script
│
│── DATASET/        # ข้อมูลที่ใช้ฝึกโมเดล
│   ├── test/
│   ├── train/
│   ├── validation/
│
│── Frontend/       # ส่วนของ Frontend (React.js)
│   ├── node_modules/
│   ├── public/
│   ├── src/
│   ├── index.html
│   ├── index.tsx
│   ├── vite.config.js
│   ├── package.json
│   ├── package-lock.json
│
│── README.md       # คำแนะนำการใช้งาน
```

## 🚀 Getting Started

### 1️⃣ ติดตั้ง Dependencies

**Backend (Flask API)**  
```sh
cd Backend
pip install -r requirements.txt
```

**Frontend (React.js + Vite)**  
```sh
cd Frontend
npm install
```

### 2️⃣ การรันเซิร์ฟเวอร์

**รัน Backend**  
```sh
cd Backend
python app.py
```

**รัน Frontend**  
```sh
cd Frontend
npm run dev
```

## 📌 Features
✅ อัปโหลดภาพผัก/ผลไม้เพื่อตรวจสอบ FODMAP  
✅ ใช้ AI ในการจำแนกประเภทอาหาร  
✅ แสดงข้อมูลเกี่ยวกับ FODMAPs สำหรับแต่ละอาหาร  
![](Frontend/public/page.png)

## 📚 License
MIT License