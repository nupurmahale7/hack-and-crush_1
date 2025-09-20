# hack-and-crush_1

---

## Features

- Responsive multi-page frontend with navigation and themed UI.
- Consumption logging form connected to backend API.
- Consumption logs displayed in a dynamic table with live updates.
- Backend REST API built with Express and MongoDB via Mongoose.
- Basic validation and error handling.
- User login page prototype (static).
- CORS enabled for API access from frontend.
  
---

## Tech Stack

- Frontend: HTML, CSS, JavaScript
- Backend: Node.js, Express
- Database: MongoDB (Atlas or local)
- Deployment: Can be deployed to platforms like Netlify (frontend) and Render/Railway (backend)
  
---

## Setup Instructions

### Backend Setup

1. Clone the repo:
    ```bash
    git clone https://github.com/yourusername/smart-water-management.git
    cd smart-water-management/backend
    ```

2. Install dependencies:
    ```bash
    npm install
    ```

3. Configure environment variables:
    - Copy `.env.example` to `.env`
    - Set your MongoDB URI in `.env` as:
      ```
      MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/waterapp?retryWrites=true&w=majority
      PORT=5000
      ```

4. Start the server:
    ```bash
    npm run dev
    ```
    The server runs on `http://localhost:5000`.

5. Test API health check:
    - Open browser or Postman and GET:  
      `http://localhost:5000/api/health`  
      Should return a success message.

---

### Frontend Setup

1. Open the `frontend` folder.

2. Open `consumption.html` (or other pages) in a browser directly.

3. The consumption form is connected to the backend API and supports:

    - Logging consumption (POST)
    - Viewing consumption logs (GET)

---

## API Endpoints

- `GET /api/health`  
  Health check endpoint.

- `POST /api/consumption`  
  Create a consumption log.  
  Body example:
  ```json
  {
    "date": "2025-09-20",
    "litersUsed": 1200,
    "userId": "user123"
  }
