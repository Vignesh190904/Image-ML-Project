import joblib
import numpy as np
import os
from pathlib import Path
from sklearn.svm import SVC
from sklearn.metrics import classification_report, confusion_matrix
import seaborn as sns
import matplotlib.pyplot as plt

# ----------- Configurable Paths -----------

BASE_DIR = Path(__file__).resolve().parent.parent
OUTPUT_DIR = BASE_DIR / "output"
FEATURES_PKL = OUTPUT_DIR / "features_labels.pkl"
CLASS_DICT_PKL = OUTPUT_DIR / "class_dictionary.pkl"
MODEL_OUTPUT = OUTPUT_DIR / "final_model.pkl"
CONF_MAT_PNG = OUTPUT_DIR / "confusion_matrix.png"

# Ensure output directory exists
OUTPUT_DIR.mkdir(parents=True, exist_ok=True)

# ----------- Load Data and Classes -----------

if not FEATURES_PKL.is_file():
    raise FileNotFoundError(f"Features file not found: {FEATURES_PKL}")
if not CLASS_DICT_PKL.is_file():
    raise FileNotFoundError(f"Class dictionary not found: {CLASS_DICT_PKL}")

features, labels = joblib.load(str(FEATURES_PKL))
class_dict = joblib.load(str(CLASS_DICT_PKL))

# ----------- Train SVM Classifier -----------

model = SVC(kernel='rbf', C=100, gamma='scale', probability=True, random_state=42)
model.fit(features, labels)

# ----------- Evaluate (On Training Data) -----------

y_pred = model.predict(features)
target_names = [k for k, _ in sorted(class_dict.items(), key=lambda x: x[1])]
print("Classification Report:\n", classification_report(labels, y_pred, target_names=target_names))

conf_matrix = confusion_matrix(labels, y_pred)
plt.figure(figsize=(8, 6))
sns.heatmap(conf_matrix, annot=True, cmap="Greens", fmt='g',
            xticklabels=target_names,
            yticklabels=target_names)
plt.xlabel('Predicted')
plt.ylabel('Actual')
plt.title('Confusion Matrix (Training Data)')
plt.tight_layout()
plt.savefig(str(CONF_MAT_PNG))
plt.close()

# ----------- Save the Trained Model -----------

joblib.dump(model, str(MODEL_OUTPUT))
print(f"✅ Model trained and saved to {MODEL_OUTPUT}.\nConfusion matrix image saved to {CONF_MAT_PNG}.")

# ----------- Notes for Users -----------

# - This script fits and evaluates on the same data (100% accuracy expected).
# - For real-world applications, use a separate validation/test set!
# - All file paths are resolved relative to project root for portability.
