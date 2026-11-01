<p align="center">
  <img src="src/frontend/public/app.png" alt="Disease Prediction System logo" width="120" />
</p>

# Disease Prediction System

A symptom-checker chatbot. Three ML models vote on the most likely disease, and Gemini turns the result into a friendly reply. A separate model predicts lifestyle-based health risk.

![Python](https://img.shields.io/badge/Python-3776AB?style=for-the-badge&logo=python&logoColor=white)
![scikit-learn](https://img.shields.io/badge/scikit--learn-F7931E?style=for-the-badge&logo=scikitlearn&logoColor=white)
![Flask](https://img.shields.io/badge/Flask-000000?style=for-the-badge&logo=flask&logoColor=white)
![Google Gemini](https://img.shields.io/badge/Gemini-8E75B2?style=for-the-badge&logo=googlegemini&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)
![MUI](https://img.shields.io/badge/MUI-007FFF?style=for-the-badge&logo=mui&logoColor=white)
![Jupyter](https://img.shields.io/badge/Jupyter-F37626?style=for-the-badge&logo=jupyter&logoColor=white)

## About

You type symptoms into a chat. The backend encodes them as a binary symptom vector and runs three scikit-learn classifiers: Random Forest, Gaussian Naive Bayes and SVM. The final prediction is the majority vote. Gemini then writes a short, casual message about the predicted condition. The chat shows details about the disease and a list of hospitals in Dehradun.

The repo also holds the Jupyter notebooks and datasets used to train the models.

> This is an academic project and does not give medical advice.

## Features

- **Local profiles**: pick or create a user profile, with name and photo, stored in `localStorage`.
- **Symptom chat**: autocomplete suggestions and quick-pick symptom combinations. Symptoms are sent as a comma-separated list such as `high_fever,headache,fatigue`.
- **Ensemble prediction**: Random Forest, Naive Bayes and SVM predictions, combined by `statistics.mode`.
- **AI reply**: a Gemini 2.0 Flash message. If the Gemini service is down, the chat shows a fixed fallback message.
- **Disease info and hospitals**: static disease details and Dehradun hospitals from `components/data.js`.
- **Lifestyle risk check**: a step-by-step form with 16 inputs (age, BMI, steps, sleep, heart rate, blood pressure, smoker and so on). A Random Forest model classifies the inputs into a risk level.
- **Model notebooks**: EDA, training, `GridSearchCV` tuning and confusion matrices for the disease and lifestyle models.

## Tech Stack

| Layer | Tools |
|-------|-------|
| Frontend | React 19, Vite 6, React Router 7, Redux Toolkit, MUI 7, Material Tailwind, Tailwind CSS 4, Framer Motion, Axios |
| APIs | Flask, Flask-CORS, joblib, NumPy |
| ML | scikit-learn (RandomForest, GaussianNB, SVC), pandas, Matplotlib, Seaborn |
| LLM | Google Gemini (`google-generativeai`, `gemini-2.0-flash`) |

## Project Structure

```
.
├── dataset/                 # Features.csv (symptom list), Testing.csv
├── model-building/
│   ├── disease.ipynb        # Disease model training + GridSearchCV tuning
│   ├── model.ipynb          # SVM / NB / RF comparison
│   ├── lifestyle.ipynb      # Lifestyle risk model
│   ├── pre.ipynb            # Preprocessing
│   ├── dataset/             # Training CSVs
│   ├── extra/               # Additional source datasets
│   └── trained_models/      # Exported models + symptom index
└── src/
    ├── api/
    │   ├── api.py           # Disease prediction API (port 5000)
    │   ├── lifestyle.py     # Lifestyle risk API (port 5001)
    │   ├── gemini.py        # Gemini reply API (port 3000)
    │   └── *.pkl, symptom_index.json
    └── frontend/            # React + Vite app
        └── src/{pages,components,layout,shared,redux}
```

## Getting Started

### Prerequisites

- Python 3.9+
- Node.js 18+
- A Google Gemini API key

### 1. Start the Python APIs

Each API loads its model files from the current directory, so run them from `src/api`. Use a separate terminal for each one.

```bash
cd src/api
pip install flask flask-cors joblib numpy scikit-learn google-generativeai python-dotenv

python api.py         # http://localhost:5000  disease prediction
python lifestyle.py   # http://localhost:5001  lifestyle risk
python gemini.py      # http://localhost:3000  Gemini reply
```

`gemini.py` needs a Gemini API key. Load it from an environment variable such as `GEMINI_API_KEY` rather than hard-coding it in the file.

### 2. Start the Frontend

```bash
cd src/frontend
npm install
npm run dev
```

Other scripts: `npm run build`, `npm run preview`, `npm run lint`.

### 3. Retrain the Models (optional)

```bash
cd model-building
pip install -r requirements.txt jupyter matplotlib seaborn scipy
jupyter notebook
```

## API Endpoints

| Service | Method | Endpoint | Body | Response |
|---------|--------|----------|------|----------|
| `api.py` (:5000) | POST | `/predict` | `{"symptoms": "itching,skin_rash"}` | `rf_model_prediction`, `naive_bayes_prediction`, `svm_model_prediction`, `final_prediction`, or `error` for an unknown symptom |
| `lifestyle.py` (:5001) | POST | `/predict` | `{"features": [16 numbers]}` | `{"prediction": <risk class>}` |
| `gemini.py` (:3000) | POST | `/get-res` | `{"disease": "Malaria"}` | `{"response": "<friendly message>"}` |

## Author

**Aryan Bhandari**: [GitHub](https://github.com/aryanbha123)
