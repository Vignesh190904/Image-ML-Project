import { getBaseUrl, getApiUrl } from '../config/api';

/**
 * Check if the backend is accessible and running.
 * @returns {Promise<boolean>}
 */
export async function checkBackendHealth() {
  try {
    const response = await fetch(getApiUrl('/api/health'), {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response.ok;
  } catch (error) {
    console.error('Backend health check failed:', error);
    return false;
  }
}

/**
 * Upload an image and receive prediction results.
 * @param {File} file - The image file to upload.
 * @returns {Promise<{predicted_class: string, confidences: Array}>}
 */
export async function predictImage(file) {
  const formData = new FormData();
  formData.append('file', file);

  const response = await fetch(getApiUrl('/api/predict'), {
    method: 'POST',
    body: formData,
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.error || 'Prediction failed. Please try again.');
  }

  return response.json();
}

/**
 * Get the base URL for static assets (member images).
 * @returns {string}
 */
export function getStaticAssetUrl(path) {
  return `${getBaseUrl()}/${path}`;
}
