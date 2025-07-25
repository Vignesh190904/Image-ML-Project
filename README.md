# Celebrity Face Recognition System

A machine learning-based web application that can identify and classify celebrity faces using computer vision and wavelet transform features.

## Features

- **Face Detection**: Uses Haar cascades to detect faces in uploaded images
- **Feature Extraction**: Combines traditional image features with wavelet transform features
- **Multi-Class Classification**: Can identify multiple celebrities including:
  - Lionel Messi
  - Maria Sharapova
  - Roger Federer
  - Serena Williams
  - Virat Kohli
- **Web Interface**: User-friendly Flask web application
- **Confidence Scoring**: Provides confidence levels for predictions

## Project Structure

```
/your-project-root
│   README.md
│   requirements.txt
│   .gitignore
│   Procfile
│
├── app/
│   ├── app.py              # Main Flask application
│   ├── static/
│   │   ├── app.js          # Frontend JavaScript
│   │   ├── style.css       # Styling
│   │   └── members/        # Sample celebrity images
│   └── templates/
│       └── index.html      # Main web page
│
├── data/
│   ├── cleaned/            # Processed training images
│   └── raw/               # Original training images
│
├── haarcascade/           # Haar cascade files for face detection
├── output/               # Trained models and outputs
└── src/                  # Training and utility scripts
    ├── clean_images.py
    ├── feature_extraction.py
    ├── predict.py
    ├── prepare_data.py
    └── train_model.py
```

## Local Development Setup

### Prerequisites

- Python 3.7 or higher
- pip (Python package installer)

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repository-url>
   cd image_classifier_project
   ```

2. **Create a virtual environment**
   ```bash
   python -m venv venv
   
   # On Windows
   venv\Scripts\activate
   
   # On macOS/Linux
   source venv/bin/activate
   ```

3. **Install dependencies**
   ```bash
   pip install -r requirements.txt
   ```

4. **Run the application**
   ```bash
   python app/app.py
   ```

5. **Access the application**
   Open your browser and go to `http://localhost:5000`

## Model Training

If you want to retrain the model with new data:

1. **Prepare your data**
   - Place celebrity images in `data/raw/<celebrity_name>/`
   - Each celebrity should have their own folder

2. **Clean and preprocess images**
   ```bash
   python src/clean_images.py
   ```

3. **Extract features**
   ```bash
   python src/feature_extraction.py
   ```

4. **Train the model**
   ```bash
   python src/train_model.py
   ```

## Deployment on Render

### Prerequisites

- A Render account
- Your code pushed to a Git repository (GitHub, GitLab, etc.)

### Deployment Steps

1. **Sign up/Login to Render**
   - Go to [render.com](https://render.com)
   - Sign up or log in to your account

2. **Create a new Web Service**
   - Click "New +" and select "Web Service"
   - Connect your Git repository
   - Select the repository containing this project

3. **Configure the service**
   - **Name**: `celebrity-face-recognition` (or your preferred name)
   - **Environment**: `Python 3`
   - **Build Command**: `pip install -r requirements.txt`
   - **Start Command**: `gunicorn app.app:app`
   - **Root Directory**: Leave empty (if the project is in the root)

4. **Environment Variables** (if needed)
   - Add any environment variables your application requires
   - For this project, no additional environment variables are needed

5. **Deploy**
   - Click "Create Web Service"
   - Render will automatically build and deploy your application
   - The deployment process typically takes 2-5 minutes

6. **Access your application**
   - Once deployed, Render will provide a URL (e.g., `https://your-app-name.onrender.com`)
   - Your application will be accessible at this URL

### Important Notes for Render Deployment

- **File Size Limits**: Render has limits on file uploads. Ensure your model files are not too large
- **Memory Usage**: The application uses OpenCV and machine learning libraries which can be memory-intensive
- **Cold Starts**: Free tier services may have cold start delays
- **Model Files**: Ensure your trained model files (`output/final_model.pkl` and `output/class_dictionary.pkl`) are included in your repository

## API Usage

### Predict Endpoint

**POST** `/predict`

Upload an image file to get celebrity classification results.

**Request:**
- Content-Type: `multipart/form-data`
- Body: Image file in the `file` field

**Response:**
```json
{
  "status": "success",
  "predicted_class": "lionel_messi",
  "class_probabilities": {
    "lionel_messi": 0.95,
    "maria_sharapova": 0.02,
    "roger_federer": 0.01,
    "serena_williams": 0.01,
    "virat_kohli": 0.01
  }
}
```

## Technologies Used

- **Backend**: Flask (Python web framework)
- **Machine Learning**: scikit-learn, OpenCV
- **Image Processing**: PyWavelets, NumPy
- **Frontend**: HTML, CSS, JavaScript
- **Deployment**: Render, Gunicorn

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

If you encounter any issues or have questions, please open an issue in the repository. 