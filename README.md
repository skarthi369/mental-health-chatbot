# Serenity AI - Mental Health Support Platform

A conversational mental health support platform that allows users to chat with an AI utilizing CBT (Cognitive Behavioral Therapy) principles. The application provides real-time emotional analysis and generates diagnostic reports with actionable precautions.

## 🌟 Features

-   **Multilingual Support**: Select your preferred language (English, Tamil, Hindi, Spanish, French) to begin.
-   **Conversational AI**: Powered by NVIDIA's `llama-4-maverick-17b`, acting as a compassionate CBT therapist.
-   **Real-time Analysis**: Visualizes stress levels (Low, Medium, High) and dominant emotions during the chat.
-   **Diagnostic Reports**: Generates a downloadable summary of the session with suggested resolutions.
-   **Premium UI**: A polished, glassmorphism-inspired interface with smooth animations and dark mode.

## 🛠️ Tech Stack

-   **Frontend**: React (Vite)
-   **Backend**: FastAPI (Python)
-   **AI Integration**: LangChain, NVIDIA API
-   **Styling**: Vanilla CSS (Custom Design System)

## 🚀 Getting Started

### Prerequisites

-   Node.js (v20+)
-   Python (v3.10+)

### 1. Backend Setup

Navigate to the backend directory and install dependencies:

```bash
cd backend
pip install -r requirements.txt
```

Start the FastAPI server:

```bash
# Development mode
uvicorn main:app --reload --port 8000
```

The backend API will be available at `http://localhost:8000`.

### 2. Frontend Setup

Navigate to the frontend directory and install dependencies:

```bash
cd frontend
npm install
```

Start the Vite development server:

```bash
npm run dev
```

The application will be running at `http://localhost:5173`.

## 📂 Project Structure

```
mental-health-platform/
├── backend/
│   ├── main.py           # FastAPI entry point
│   ├── agent.py          # LangChain & NVIDIA API logic
│   └── requirements.txt  # Python dependencies
├── frontend/
│   ├── src/
│   │   ├── components/   # React components (Chat, Analysis, etc.)
│   │   ├── App.jsx       # Main application logic
│   │   └── index.css     # Global styles & glassmorphism
│   └── package.json      # Node dependencies
└── README.md
```
<img width="1632" height="948" alt="image" src="https://github.com/user-attachments/assets/1c477030-4793-4314-8727-8db27e7503e2" />
<img width="1632" height="948" alt="image" src="https://github.com/user-attachments/assets/c796ac81-8cec-447b-9238-d36d79220d17" />

## 🛡️ License

This project is open-source and available under the MIT License.
