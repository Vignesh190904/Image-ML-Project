import os
from flask import Flask, request, jsonify, send_from_directory, make_response
from flask_cors import CORS
import cv2
import numpy as np
import joblib
import pywt
from pathlib import Path
import logging

# ----------- Path Configuration -----------
BASE_DIR = Path(__file__).resolve().parent
MODEL_PATH = BASE_DIR.parent / "output" / "final_model.pkl"
CLASS_DICT_PATH = BASE_DIR.parent / "output" / "class_dictionary.pkl"
FACE_CASCADE_PATH = BASE_DIR.parent / "haarcascade" / "haarcascade_frontalface_default.xml"
EYE_CASCADE_PATH = BASE_DIR.parent / "haarcascade" / "haarcascade_eye.xml"
UPLOAD_DIR = BASE_DIR / "static" / "uploads"

os.makedirs(UPLOAD_DIR, exist_ok=True)

# ----------- Flask App Setup -----------
app = Flask(__name__)
CORS(app)

# ----------- ML Model and Preprocessing Setup -----------
model = joblib.load(str(MODEL_PATH))
class_dict = joblib.load(str(CLASS_DICT_PATH))
inv_class_dict = {v: k for k, v in class_dict.items()}
face_cascade = cv2.CascadeClassifier(str(FACE_CASCADE_PATH))
eye_cascade = cv2.CascadeClassifier(str(EYE_CASCADE_PATH))

def get_cropped_face_if_valid(img):
    gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
    faces = face_cascade.detectMultiScale(gray, 1.3, 5)
    for (x, y, w, h) in faces:
        roi_gray = gray[y:y+h, x:x+w]
        roi_color = img[y:y+h, x:x+w]
        eyes = eye_cascade.detectMultiScale(roi_gray)
        if len(eyes) >= 2:
            return roi_color
    return None

def wavelet_transform(img, mode='haar', level=1):
    img_gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
    img_gray = np.float32(img_gray) / 255.0
    coeffs = pywt.wavedec2(img_gray, mode, level=level)
    coeffs_H = list(coeffs)
    coeffs_H[0] *= 0
    img_reconstructed = pywt.waverec2(coeffs_H, mode)
    img_reconstructed *= 255
    img_reconstructed = np.uint8(np.clip(img_reconstructed, 0, 255))
    return img_reconstructed

def extract_features(img):
    cropped_face = get_cropped_face_if_valid(img)
    if cropped_face is None:
        return None
    cropped_face = cv2.resize(cropped_face, (32, 32))
    img_har = wavelet_transform(cropped_face, 'db1', 5)
    img_har = cv2.resize(img_har, (32, 32))
    combined_img = np.vstack((cropped_face.reshape(32*32*3, 1), img_har.reshape(32*32, 1)))
    return combined_img.flatten()

# ----------- Friendly Home Page -----------
@app.route("/", methods=["GET"])
def index():
    return "ML Backend is running. Try /api/health", 200

# ----------- API Endpoints -----------
@app.route("/api/health", methods=["GET", "POST"])
def health():
    if request.method == "GET":
        return "Backend up & running!", 200
    elif request.method == "POST":
        return jsonify({"message": "Health check via POST"}), 200
    else:
        return jsonify({"error": "Method not allowed"}), 405

logging.basicConfig(level=logging.INFO)

@app.route("/api/predict", methods=["POST", "GET"])
def predict():
    try:
        logging.info(f"Request: method={request.method}, headers={dict(request.headers)}, files={request.files}, form={request.form}")
        if request.method == "GET":
            logging.info("GET request to /api/predict")
            return jsonify({"message": "Send a POST request with an image file to get a prediction."}), 200
        if 'file' not in request.files:
            logging.error("No file provided in request")
            return jsonify({"error": "No file provided"}), 400
        file = request.files['file']
        if file.filename == "":
            logging.error("Empty filename in uploaded file")
            return jsonify({"error": "Empty filename"}), 400
        upload_path = UPLOAD_DIR / file.filename
        file.save(str(upload_path))
        logging.info(f"Saved uploaded file to {upload_path}")
        img = cv2.imread(str(upload_path))
        if img is None:
            logging.error(f"Unable to read image file: {upload_path}")
            return jsonify({"error": "Unable to read image file"}), 415
        features = extract_features(img)
        if features is None:
            logging.error("No face with 2 eyes detected in image")
            return jsonify({"error": "No face with 2 eyes detected"}), 422
        prediction = model.predict([features])[0]
        proba = model.predict_proba([features])[0]
        predicted_class = inv_class_dict[prediction]
        confidences = [
            {"label": inv_class_dict[i], "value": float(prob)}
            for i, prob in enumerate(proba)
        ]
        logging.info(f"Prediction: {predicted_class}, Confidences: {confidences}")
        return jsonify({
            "predicted_class": predicted_class,
            "confidences": confidences
        })
    except Exception as e:
        logging.exception("Exception during prediction")
        return make_response(jsonify({"error": f"Internal server error: {str(e)}"}), 500)

@app.route('/images/<category>/<filename>')
def serve_image(category, filename):
    image_dir = BASE_DIR.parent / "data" / "cleaned" / category
    return send_from_directory(image_dir, filename)

@app.route("/api", methods=["GET"])
def api_root():
    return jsonify({"message": "Welcome to the ML API"}), 200

if __name__ == "__main__":
    app.run(debug=True)
