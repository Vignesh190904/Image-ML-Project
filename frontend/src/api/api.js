const BASE_URL =
  process.env.REACT_APP_API_URL || 'https://image-ml-project.onrender.com/api';

/**
 * Upload an image and receive prediction results.
 * @param {File} file - The image file to upload.
 * @returns {Promise<{predicted_class: string, confidences: Array}>}
 */
export async function predictImage(file) {
  const formData = new FormData();
  formData.append('file', file);

  const response = await fetch(`${BASE_URL}/predict`, {
    method: 'POST',
    body: formData,
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.error || 'Prediction failed. Please try again.');
  }

  return response.json();
}
