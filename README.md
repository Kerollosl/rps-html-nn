# Rock Paper Scissors HTML Neural Network 🪨📄✂️

## Kerollos Lowandy

**Repository:** [rps-html-nn](https://github.com/Kerollosl/rps-html-nn)

## 📋 Overview

A browser-based neural network that plays Rock Paper Scissors using real-time webcam input. Built with TensorFlow.js, this project demonstrates transfer learning and real-time image classification entirely in the browser.

## 🎯 Features

- **Browser-Based:** No installation required, runs entirely in browser
- **Real-time Recognition:** Webcam-based hand gesture detection
- **Transfer Learning:** Uses pre-trained MobileNet model
- **Interactive Training:** Train the model with your own hand gestures
- **Instant Gameplay:** Play RPS against the AI immediately

## 🧠 Model Architecture

- **Base Model:** MobileNet (pre-trained on ImageNet)
- **Transfer Learning:** Custom classification head for RPS
- **Framework:** TensorFlow.js
- **Input:** Webcam images
- **Output:** 3 classes (Rock, Paper, Scissors)

## 🚀 Quick Start

### Prerequisites
- Modern web browser (Chrome, Firefox, Safari, Edge)
- Webcam
- Internet connection (for loading TensorFlow.js)

### Running the Application

**Option 1: Direct File**
```bash
open C1_W4_Lab_1_retrain.html
```

**Option 2: Local Server**
```bash
python -m http.server 8000
# Then open http://localhost:8000/C1_W4_Lab_1_retrain.html
```

## 📁 Repository Contents

### HTML/JavaScript Files
- `C1_W4_Lab_1_retrain.html` - Main application interface
- `index.js` - Core neural network and training logic
- `webcam.js` - Webcam capture and preprocessing utilities
- `rps-dataset.js` - Dataset handling and management

### Documentation
- `ReadMe.txt` - Original project documentation
- `License.txt` - Project license information

## 🎮 How to Use

### 1. Training Phase
1. Open the HTML file in your browser
2. Allow webcam permissions
3. For each gesture (Rock, Paper, Scissors):
   - Position your hand in front of camera
   - Click "Add Sample" multiple times (~20-30 samples)
4. Click "Train Model"
5. Wait for training to complete

### 2. Playing Phase
1. After training, show your hand gesture
2. The model predicts your move in real-time
3. Play against the computer!

## 🛠️ Technical Stack

- **Machine Learning:** TensorFlow.js
- **Transfer Learning:** MobileNet v1
- **Web Technologies:** HTML5, JavaScript, CSS
- **Computer Vision:** WebRTC for webcam access
- **Model Training:** Browser-based training with WebGL acceleration

## 📝 Code Structure

### index.js
- Model initialization and transfer learning setup
- Training loop implementation
- Prediction logic
- Game state management

### webcam.js
- Webcam stream handling
- Image capture and preprocessing
- Frame normalization
- Tensor conversion

### rps-dataset.js
- Training data collection
- Sample management
- Dataset augmentation
- Batch preparation

## 🔧 Customization

### Adjust Training Parameters
```javascript
// In index.js
const epochs = 10;  // Number of training iterations
const batchSize = 16;  // Samples per batch
const learningRate = 0.001;  // Training speed
```

### Add More Gestures
```javascript
// Extend to include more classes
const classes = ['Rock', 'Paper', 'Scissors', 'Lizard', 'Spock'];
```

## 📈 Performance

- **Training Time:** ~30 seconds (browser-dependent)
- **Inference Speed:** Real-time (30+ FPS)
- **Accuracy:** High with 20+ samples per class
- **Hardware:** Runs on CPU or GPU (WebGL)

## 🎓 Educational Value

This project demonstrates:
- Transfer learning concepts
- Real-time ML in browsers
- TensorFlow.js capabilities
- Interactive model training
- Computer vision fundamentals

## 🌐 Browser Compatibility

- ✅ Chrome 60+
- ✅ Firefox 55+
- ✅ Safari 11+
- ✅ Edge 79+

## 💡 Tips for Best Results

1. **Lighting:** Ensure good, consistent lighting
2. **Background:** Use a plain background
3. **Samples:** Collect 20-30 samples per gesture
4. **Variety:** Vary hand position slightly when collecting samples
5. **Distance:** Keep consistent distance from camera

## 🐛 Troubleshooting

**Model not training:**
- Ensure you've collected samples for all 3 gestures
- Check browser console for errors
- Try refreshing the page

**Poor accuracy:**
- Collect more training samples
- Ensure consistent lighting
- Use a plain background
- Retrain the model

**Webcam not working:**
- Check browser permissions
- Ensure no other app is using the webcam
- Try a different browser

## 👤 Author

**Kerollos Lowandy**
- GitHub: [@Kerollosl](https://github.com/Kerollosl)
- Email: klowandy@gmail.com

## 📄 License

See `License.txt` for details.

---

**Last Updated:** March 27, 2026
