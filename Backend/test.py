import requests

url = "https://apifodmaps.onrender.com/predict"
with open('./upload_images/test.jpg', 'rb') as f:
    response = requests.post(url, files={'file': f})
print(response.json())

