import cv2
import os
import shutil
import argparse

def parse_args():
    parser = argparse.ArgumentParser(description="Clean and filter face images for model training.")
    parser.add_argument('--raw_dir', type=str, default='data/raw',
                        help='Directory of raw, labeled image folders')
    parser.add_argument('--cleaned_dir', type=str, default='data/cleaned',
                        help='Directory to save cleaned, valid, and renamed images')
    parser.add_argument('--face_cascade', type=str, default='haarcascade/haarcascade_frontalface_default.xml',
                        help='Path to haarcascade_frontalface_default.xml')
    parser.add_argument('--eye_cascade', type=str, default='haarcascade/haarcascade_eye.xml',
                        help='Path to haarcascade_eye.xml')
    return parser.parse_args()

def is_valid_image(img_path, face_cascade, eye_cascade):
    img = cv2.imread(img_path)
    if img is None:
        return False
    gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
    faces = face_cascade.detectMultiScale(gray, 1.3, 5)
    for (x, y, w, h) in faces:
        roi_gray = gray[y:y+h, x:x+w]
        eyes = eye_cascade.detectMultiScale(roi_gray)
        if len(eyes) >= 2:
            return True
    return False

def clean_images(input_dir, output_dir, face_cascade, eye_cascade):
    for label in os.listdir(input_dir):
        src_folder = os.path.join(input_dir, label)
        dst_folder = os.path.join(output_dir, label)
        if not os.path.isdir(src_folder):
            continue
        os.makedirs(dst_folder, exist_ok=True)
        serial = 1
        for file in os.listdir(src_folder):
            src_img_path = os.path.join(src_folder, file)
            if is_valid_image(src_img_path, face_cascade, eye_cascade):
                ext = os.path.splitext(file)[1].lower() or ".jpg"
                dst_img_name = f"{label}_{serial}{ext}"
                dst_img_path = os.path.join(dst_folder, dst_img_name)
                shutil.copy(src_img_path, dst_img_path)
                print(f"Valid image: {file} -> {dst_img_name}")
                serial += 1
            else:
                print(f"Invalid image: {file} - skipped")

if __name__ == "__main__":
    args = parse_args()
    face_cascade = cv2.CascadeClassifier(args.face_cascade)
    eye_cascade = cv2.CascadeClassifier(args.eye_cascade)
    clean_images(args.raw_dir, args.cleaned_dir, face_cascade, eye_cascade)
