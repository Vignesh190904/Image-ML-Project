import cv2
import os
import numpy as np
import joblib
import pywt
from tqdm import tqdm
from pathlib import Path

# ----- Robust Path Configuration -----
BASE_DIR = Path(__file__).resolve().parent.parent
CLEANED_DIR = BASE_DIR / "data" / "cleaned"
OUTPUT_DIR = BASE_DIR / "output"
FEATURES_PKL = OUTPUT_DIR / "features_labels.pkl"
CLASS_DICT_PKL = OUTPUT_DIR / "class_dictionary.pkl"
FACE_CASCADE_PATH = BASE_DIR / "haarcascade" / "haarcascade_frontalface_default.xml"
EYE_CASCADE_PATH = BASE_DIR / "haarcascade" / "haarcascade_eye.xml"

# Validate required paths
if not CLEANED_DIR.is_dir():
    raise FileNotFoundError(f"Cleaned data directory not found: {CLEANED_DIR}")
if not FACE_CASCADE_PATH.is_file():
    raise FileNotFoundError(f"Face haarcascade not found: {FACE_CASCADE_PATH}")
if not EYE_CASCADE_PATH.is_file():
    raise FileNotFoundError(f"Eye haarcascade not found: {EYE_CASCADE_PATH}")

# ----- Haarcascade Classifiers -----
face_cascade = cv2.CascadeClassifier(str(FACE_CASCADE_PATH))
eye_cascade = cv2.CascadeClassifier(str(EYE_CASCADE_PATH))

def get_cropped_face_if_valid(image_path):
    img = cv2.imread(str(image_path))
    if img is None:
        return None
    gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
    faces = face_cascade.detectMultiScale(gray, 1.3, 5)
    for (x, y, w, h) in faces:
        roi_gray = gray[y:y + h, x:x + w]
        roi_color = img[y:y + h, x:x + w]
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

def extract_face_features(image_path):
    cropped_face = get_cropped_face_if_valid(image_path)
    if cropped_face is None:
        return None
    cropped_face = cv2.resize(cropped_face, (32, 32))
    img_har = wavelet_transform(cropped_face, 'db1', 5)
    img_har = cv2.resize(img_har, (32, 32))
    combined_img = np.vstack((cropped_face.reshape(32 * 32 * 3, 1), img_har.reshape(32 * 32, 1)))
    return combined_img.flatten()

def extract_features(cleaned_dir):
    features = []
    labels = []
    class_dict = {}
    current_label = 0

    class_names = [d for d in os.listdir(cleaned_dir) if (cleaned_dir / d).is_dir()]
    for class_name in class_names:
        class_path = cleaned_dir / class_name
        class_dict[class_name] = current_label
        for image_file in tqdm(os.listdir(class_path), desc=f"Processing {class_name}"):
            image_path = class_path / image_file
            feature = extract_face_features(image_path)
            if feature is not None:
                features.append(feature)
                labels.append(current_label)
        current_label += 1

    features = np.array(features)
    labels = np.array(labels)
    OUTPUT_DIR.mkdir(parents=True, exist_ok=True)
    joblib.dump((features, labels), str(FEATURES_PKL))
    joblib.dump(class_dict, str(CLASS_DICT_PKL))
    print(f"Saved features to {FEATURES_PKL} and class dictionary to {CLASS_DICT_PKL}")

if __name__ == '__main__':
    extract_features(CLEANED_DIR)