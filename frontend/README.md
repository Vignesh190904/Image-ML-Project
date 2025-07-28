# Celebrity Image Classifier - Frontend

A React-based frontend for the Celebrity Image Classifier ML project. This application allows users to upload images and receive predictions about which celebrity appears in the photo.

## 🚀 Features

- **Image Upload**: Drag and drop or click to upload images
- **Real-time Prediction**: Get instant celebrity predictions with confidence scores
- **Backend Health Monitoring**: Visual indicators for backend connection status
- **Responsive Design**: Works on desktop and mobile devices
- **Error Handling**: Graceful handling of network errors and failed predictions

## 🔧 Configuration

### Backend Integration

The frontend is configured to work with the hosted backend at:
**https://image-ml-project.onrender.com**

### Environment Configuration

You can modify the backend URL in `src/config/api.js`:

```javascript
const API_CONFIG = {
  PRODUCTION_URL: 'https://image-ml-project.onrender.com',
  DEVELOPMENT_URL: 'http://localhost:5000',
  CURRENT_ENV: 'production', // Change to 'development' for local backend
  // ...
};
```

### Environment Variables

Create a `.env` file in the frontend root to override settings:

```bash
# For local development
REACT_APP_API_URL=http://localhost:5000

# For hosted backend (default)
REACT_APP_API_URL=https://image-ml-project.onrender.com
```

## 🛠️ Installation & Setup

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Start development server:**
   ```bash
   npm start
   ```
   
   **Or use the batch file:**
   ```bash
   start-dev.bat
   ```

3. **Build for production:**
   ```bash
   npm run build
   ```

## 🌐 Local Development

The app runs at: **http://localhost:3000/**

- ✅ Direct access to home page
- ✅ No subdirectory routing
- ✅ Clean URL structure

## 📡 API Endpoints

The frontend communicates with these backend endpoints:

- `GET /api/health` - Health check
- `POST /api/predict` - Image prediction
- `GET /api` - API welcome message

## 🎯 Usage

1. **Upload an Image**: Use the upload area to select or drag an image
2. **View Prediction**: The system will analyze the image and show the predicted celebrity
3. **Check Confidence**: See confidence scores for all possible celebrities
4. **View Examples**: Browse the member gallery to see example images

## 🔍 Backend Status

The application includes real-time backend status monitoring:

- ✅ **Online**: Backend is accessible and ready
- ⚠️ **Offline**: Backend is not responding (predictions disabled)
- 🔍 **Checking**: Verifying backend connection

## 🏗️ Project Structure

```
frontend/
├── src/
│   ├── api/           # API communication functions
│   ├── components/    # React components
│   ├── config/        # Configuration files
│   ├── hooks/         # Custom React hooks
│   ├── pages/         # Page components
│   └── styles/        # CSS styles
├── public/            # Static assets
└── package.json       # Dependencies and scripts
```

## 🚀 Deployment

This frontend can be deployed to:

- **Netlify**: Connect your GitHub repo
- **Vercel**: Automatic deployments from Git
- **GitHub Pages**: Use `npm run deploy`
- **Firebase Hosting**: Use Firebase CLI

## 🔧 Development

### Available Scripts

- `npm start` - Start development server
- `npm run build` - Build for production
- `npm test` - Run tests
- `npm run eject` - Eject from Create React App

### Key Components

- **Home.js**: Main application page with upload and prediction
- **ImageUpload.js**: File upload component
- **PredictionResult.js**: Displays prediction results
- **MemberGallery.js**: Shows example member images
- **api.js**: Handles all backend communication

## 📝 Notes

- The backend is hosted on Render.com at `https://image-ml-project.onrender.com`
- Member images are served from the backend's static directory
- CORS is enabled on the backend for cross-origin requests
- The application includes comprehensive error handling for network issues
- The app runs at the root URL `http://localhost:3000/` for local development

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is part of the ML Project repository.
