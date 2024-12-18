# FileHive

## Demo
https://github.com/user-attachments/assets/99098994-6804-40d5-a7b7-5cd92fc40517

## Intro
This project combines a React frontend with a Flask backend to create a full-stack web application. The React app provides the user interface, 
while Flask serves as the backend API for handling data and business logic.This guide will walk you through the setup, running both the frontend 
and backend locally, and integrating them seamlessly.

## Prerequisites
1. Node.js (for React)
2. Python 3.x (for Flask)
3. npm

## Steps to run the project
1. Clone the project && navigate inside the project
   ``` bash
    git clone https://github.com/anirudh-hegde/filehive.git && cd filehive
   ```

2. Backend setup:
   ```bash
   cd src/backend
   python3 -m venv venv
   source venv/bin/activate
   pip install -r requirements.txt
   python3 App.py
   ```
   
3. Frontend setup:
   ```bash
   cd src/frontend
   npm install
   npm run dev
   ```

## About
### Technologies Used
* Frontend: React (Vite setup for modern development)
* Backend: Flask with Flask-CORS for handling API requests
* Tools: Node.js, Python 3.x

### Key Features
* Full-stack development with React and Flask
* Seamless communication between frontend and backend
* Modern, lightweight React setup using Vite
* API handling and folder creation functionality in Flask
