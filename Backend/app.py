import numpy as np
from keras.preprocessing.image import load_img, img_to_array
from keras.models import load_model
from flask import Flask, jsonify, request
from flask_cors import CORS


model = load_model('./models/FV.h5')

labels = {0: 'apple', 1: 'banana', 2: 'beetroot', 3: 'bell pepper', 4: 'cabbage', 5: 'capsicum', 6: 'carrot',
          7: 'cauliflower', 8: 'chilli pepper', 9: 'corn', 10: 'cucumber', 11: 'eggplant', 12: 'garlic', 13: 'ginger',
          14: 'grapes', 15: 'jalepeno', 16: 'kiwi', 17: 'lemon', 18: 'lettuce',
          19: 'mango', 20: 'onion', 21: 'orange', 22: 'paprika', 23: 'pear', 24: 'peas', 25: 'pineapple',
          26: 'pomegranate', 27: 'potato', 28: 'raddish', 29: 'soy beans', 30: 'spinach', 31: 'sweetcorn',
          32: 'sweetpotato', 33: 'tomato', 34: 'turnip', 35: 'watermelon'}

fodmaps = {'apple': 'high', 'banana': 'low', 'beetroot': 'high', 'bell pepper': 'low', 'cabbage': 'moderate',
            'capsicum': 'low', 'carrot': 'low', 'cauliflower': 'high', 'chilli pepper': 'low', 'corn': 'high',
            'cucumber': 'low', 'eggplant': 'low', 'garlic': 'high', 'ginger': 'low', 'grapes': 'low',
            'jalepeno': 'low', 'kiwi': 'low', 'lemon': 'low', 'lettuce': 'low', 'mango': 'high',
            'onion': 'high', 'orange': 'low', 'paprika': 'low', 'pear': 'high', 'peas': 'moderate',
            'pineapple': 'low', 'pomegranate': 'moderate', 'potato': 'low', 'raddish': 'moderate',
            'soy beans': 'high', 'spinach': 'low', 'sweetcorn': 'high', 'sweetpotato': 'moderate',
            'tomato': 'low', 'turnip': 'moderate', 'watermelon': 'high'
}


def prepare_image(img_path):
    try:
        img = load_img(img_path, target_size=(224, 224, 3))
        img = img_to_array(img)
        img = img / 255
        img = np.expand_dims(img, [0])
        print("Image preprocessed successfully")
        answer = model.predict(img)
        print("Prediction completed:", answer)
        y_class = answer.argmax(axis=-1)
        y = int(y_class[0])  # Ensure correct type
        res = labels[y]
        print("Result:", res)
        return res.capitalize()
    except Exception as e:
        print("Error in prepare_image:", e)
        raise



app = Flask(__name__)
CORS(app)

@app.route('/predict', methods=['POST'])
def infer_image():
    if 'file' not in request.files:
        return jsonify(error="Please try again. The Image doesn't exist")

    file = request.files.get('file')
    img_bytes = file.read()
    img_path = "./upload_images/test.jpg"
    with open(img_path, "wb") as img:
        img.write(img_bytes)

    result = prepare_image(img_path)
    fodmap_value = fodmaps.get(result.lower(), "Unknown")

    return jsonify(prediction=result, fodmap=fodmap_value)


if __name__ == '__main__':
    app.run(debug=False, host='0.0.0.0')


