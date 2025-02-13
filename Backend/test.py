import requests

url = "http://127.0.0.1:5000/predict"
with open('Image_4.jpg', 'rb') as f:
    response = requests.post(url, files={'file': f})
print(response.json())
