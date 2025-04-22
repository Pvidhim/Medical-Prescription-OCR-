# 🩺 Medical Prescription OCR

A static web-based simulation and deep learning prototype to digitize handwritten medical prescriptions using Optical Character Recognition (OCR) techniques and a CNN model trained on the EMNIST dataset.

---

## 📌 Project Overview

This project addresses the widespread issue of illegible handwritten medical prescriptions. It simulates an OCR tool via a clean static web interface and uses a deep learning model for character recognition in an offline environment. It demonstrates how AI can improve healthcare readability and safety.

---

## 🧠 Core Features

- Upload handwritten prescription images (JPEG/PNG).
- Simulated OCR output using JavaScript.
- Sign In / Sign Up interface with session-based scan history.
- CNN model trained on the EMNIST dataset.
- Complete handwriting recognition pipeline using OpenCV and TensorFlow.
- Modular, responsive frontend UI.

---

## 🛠️ Technologies Used

### Frontend
- HTML5, CSS3, JavaScript
- Bootstrap (UI styling)
- LocalStorage (scan history simulation)

### Backend (Prototype/Offline)
- TensorFlow, Keras
- EMNIST Dataset
- OpenCV (image preprocessing)
- Python, Jupyter Notebook

---

## 📦 Project Structure

```plaintext
Medical-Prescription-OCR/
│
├── model_training/
│   └── Medical_Prescription_OCR.ipynb
│
├── website/
│   ├── index.html
│   ├── how-it-works.html
│   ├── about.html
│   ├── contact.html
│   ├── css/
│   └── js/
│
├── assets/
│   ├── screenshots/
│   └── logo/
│
├── README.md
└── LICENSE
```
## 📈 Model Performance

- **Dataset**: EMNIST (Balanced Split)  
- **Input Size**: 28x28 grayscale images  
- **Architecture**: Multi-layer CNN  
- **Test Accuracy**: ~85%  
- **Epochs**: 20  
- **Optimizer**: Adam  
- **Loss Function**: Categorical Crossentropy  

---

## 📊 Sample Visualizations

### Sample Characters from EMNIST  
![Sample Characters](assets/screenshots/emnist_samples.png)

### Class Distribution  
![Class Distribution](assets/screenshots/class_distribution.png)

---

## 🖼️ Website Screens

| Upload Page | OCR Result | Dashboard |
|-------------|------------|-----------|
| ![Upload](assets/screenshots/upload.png) | ![Result](assets/screenshots/result.png) | ![Dashboard](assets/screenshots/dashboard.png) |

---

## 🔮 Future Enhancements

- Integration of real-time backend model with Flask or FastAPI  
- Deployment of trained model using TensorFlow Lite (mobile support)  
- Drug information lookup and NER (Named Entity Recognition)  
- Multilingual support (Hindi, Gujarati, etc.)  
- Mobile app using Flutter or React Native  

---

## 💡 How to Run the Notebook

### Clone the repository:
```bash
git clone https://github.com/yourusername/Medical-Prescription-OCR.git
cd Medical-Prescription-OCR/model_training
```
## 🚀 Open the Notebook

```bash
jupyter notebook Medical_Prescription_OCR.ipynb
```
## 🔧 Install Dependencies

Before running the notebook, ensure you have the required libraries installed:

```bash
pip install tensorflow tensorflow-datasets opencv-python matplotlib seaborn
```
## ▶️ Run the Notebook Step-by-Step
This Jupyter Notebook walks you through the complete pipeline:

✅ Load and visualize the EMNIST dataset

🛠️ Preprocess handwritten characters

🧠 Build and train a Convolutional Neural Network (CNN)

🧪 Simulate OCR prediction on sample inputs


