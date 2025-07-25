import cv2
import os
import numpy as np
import pywt
import joblib
from pathlib import Path
from sklearn.preprocessing import LabelEncoder

# -------- Robust Path Handling --------
BASE_DIR = Path(__file__).resolve().parent.parent  # Points to project root

DATA_DIR = BASE_DIR / "data" / "cleaned"
OUTPUT_PKL = BASE_DIR / "output" / "features_labels.pkl"
FACE_CASCADE_PATH = BASE_DIR / "haarcascade" / "haarcascade_frontalface_default.xml"
EYE_CASCADE_PATH = BASE_DIR / "haarcascade" / "haarcascade_eye.xml"

if not DATA_DIR.exists():
    raise FileNotFoundError(f"Data directory not found: {DATA_DIR}")
if not FACE_CASCADE_PATH.is_file():
    raise FileNotFoundError(f"Face Haarcascade not found: {FACE_CASCADE_PATH}")
if not EYE_CASCADE_PATH.is_file():
    raise FileNotFoundError(f"Eye Haarcascade not found: {EYE_CASCADE_PATH}")

# -------- Initialize Models --------
face_cascade = cv2.CascadeClassifier(str(FACE_CASCADE_PATH))
eye_cascade = cv2.CascadeClassifier(str(EYE_CASCADE_PATH))

def wavelet_transform(img, mode='haar', level=1):
    img_gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
    img_gray = np.float32(img_gray) / 255.0
    coeffs = pywt.wavedec2(img_gray, mode, level=level)
    coeffs_H = list(coeffs)
    coeffs_H[0] *= 0
    img_reconstructed = pywt.waverec2(coeffs_H, mode)
    img_reconstructed *= 255
    img_reconstructed = np.uint8(img_reconstructed)
    return img_reconstructed

def extract_face_and_eyes(img_path):
    img = cv2.imread(str(img_path))
    if img is None:
        return None
    gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
    faces = face_cascade.detectMultiScale(gray, 1.3, 5)
    for (x, y, w, h) in faces:
        face_roi = img[y:y+h, x:x+w]
        eyes = eye_cascade.detectMultiScale(cv2.cvtColor(face_roi, cv2.COLOR_BGR2GRAY))
        if len(eyes) >= 2:
            return cv2.resize(face_roi, (32, 32))
    return None

def prepare_feature_dataset(data_dir, output_pkl):
    X = []
    y = []
    class_names = [entry for entry in os.listdir(data_dir) if (data_dir / entry).is_dir()]
    print(f"Classes found: {class_names}")
    for label in class_names:
        class_dir = data_dir / label
        for img_path in class_dir.glob("*.*"):
            if img_path.suffix.lower() in ['.jpg', '.jpeg', '.png', '.jfif']:
                cropped_face = extract_face_and_eyes(img_path)
                if cropped_face is not None:
                    scaled_raw = cropped_face / 255.0
                    wavelet_img = wavelet_transform(cropped_face, 'db1', 5)
                    wavelet_img = cv2.resize(wavelet_img, (32, 32)) / 255.0
                    combined = np.concatenate((scaled_raw.flatten(), wavelet_img.flatten()))
                    X.append(combined)
                    y.append(label)
    if len(X) == 0:
        raise RuntimeError("No valid images found in dataset!")
    X = np.array(X)
    le = LabelEncoder()
    y_encoded = le.fit_transform(y)
    os.makedirs(os.path.dirname(output_pkl), exist_ok=True)
    joblib.dump({"X": X, "y": y_encoded, "label_map": le.classes_}, str(output_pkl))
    print(f"Saved feature matrix with shape {X.shape} and labels to {output_pkl}")

if __name__ == "__main__":
    prepare_feature_dataset(DATA_DIR, OUTPUT_PKL)
