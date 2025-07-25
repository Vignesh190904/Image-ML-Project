import joblib
import numpy as np
from pathlib import Path
from sklearn.metrics import classification_report, confusion_matrix
import seaborn as sns
import matplotlib.pyplot as plt

# -------- Path Configuration --------
BASE_DIR = Path(__file__).resolve().parent.parent
OUTPUT_DIR = BASE_DIR / "output"
FEATURES_PKL = OUTPUT_DIR / "features_labels.pkl"
CLASS_DICT_PKL = OUTPUT_DIR / "class_dictionary.pkl"
MODEL_PKL = OUTPUT_DIR / "final_model.pkl"
CONF_MAT_PNG = OUTPUT_DIR / "predict_confusion_matrix.png"

# --------- Check All Files Exist ---------
for p, desc in [
    (MODEL_PKL, "Trained model"),
    (CLASS_DICT_PKL, "Class dictionary"),
    (FEATURES_PKL, "Feature+label file")
]:
    if not p.is_file():
        print(f"❌ {desc} not found at {p}")
        exit(1)

# --------- Load All Data ---------
model = joblib.load(str(MODEL_PKL))
class_dict = joblib.load(str(CLASS_DICT_PKL))
features_labels = joblib.load(str(FEATURES_PKL))

# Backwards compatibility if tuple or dict:
if isinstance(features_labels, dict):
    X = features_labels["X"]
    y = features_labels["y"]
    label_names = list(features_labels.get("label_map", []))
elif isinstance(features_labels, tuple):
    X, y = features_labels
    label_names = [cls for cls, _ in sorted(class_dict.items(), key=lambda x: x[1])]
else:
    raise TypeError("Invalid features_labels structure in features_labels.pkl")

# --------- Make Predictions ---------
y_pred = model.predict(X)

print("=== Classification Report ===")
print(classification_report(y, y_pred, target_names=label_names if len(label_names) else None))

print("=== Confusion Matrix ===")
conf_matrix = confusion_matrix(y, y_pred)
print(conf_matrix)

# --------- Save Confusion Matrix as Image ---------
plt.figure(figsize=(8, 6))
sns.heatmap(conf_matrix, annot=True, cmap="Greens", fmt='g',
            xticklabels=label_names if len(label_names) else None,
            yticklabels=label_names if len(label_names) else None)
plt.xlabel('Predicted')
plt.ylabel('Actual')
plt.title('Model Confusion Matrix (Full Dataset)')
plt.tight_layout()
plt.savefig(str(CONF_MAT_PNG))
plt.close()

print(f"\nConfusion matrix image saved to {CONF_MAT_PNG}")

# --------- Note ---------
# This script evaluates your model on the full feature set (not on held-out/test data).
# To add test/train split or other advanced evaluation, simply specify!
