<<<<<<< HEAD
# Kreativity League Platform

This repository contains the source code for the Kreativity League platform, a MERN stack application.

## Prerequisites

Before running the application, ensure you have the following installed:

- [Node.js](https://nodejs.org/) (v16 or higher recommended)
- [MongoDB](https://www.mongodb.com/) (Local instance or Atlas connection string)

## Installation

1.  **Clone the repository:**
    ```bash
    git clone <repository-url>
    cd Kreativity
    ```

2.  **Install dependencies:**
    You can install dependencies for the root, server, and client simultaneously using the helper script:
    ```bash
    npm run install:all
    ```
    
    Alternatively, install them manually:
    ```bash
    # Root dependencies
    npm install

    # Server dependencies
    cd server
    npm install
    cd ..

    # Client dependencies
    cd client
    npm install
    cd ..
    ```

## Environment Configuration

Create a `.env` file in the `server` directory. You can use the provided `.env.example` as a template.

**File:** `server/.env`

```env
NODE_ENV=development
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
GOOGLE_CLIENT_ID=your_google_client_id
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
```

## Running the Application

### Method 1: Concurrent Run (Recommended)

To run both the backend server and frontend client simultaneously from the root directory:

```bash
npm start
```
Or for development mode (with nodemon):
```bash
npm run dev
```

### Method 2: Manual / Individual Execution

If you prefer to run the services in separate terminals:

**1. Database**
Ensure your local MongoDB instance is running, or that you have a valid internet connection if using MongoDB Atlas.

**2. Backend Server**
Open a terminal and run:
```bash
cd server
npm run dev
# OR for production mode
npm start
```
The server will start on port 5000 (or the port defined in your .env file).

**3. Frontend Client**
Open a second terminal and run:
```bash
cd client
npm run dev
```
The client will typically start on `http://localhost:5173`.

## Troubleshooting

- **Module Not Found Errors:** Ensure you have run `npm install` in both `server` and `client` directories.
- **Connection Refused:** Check if MongoDB is running and the `MONGO_URI` is correct.
- **Port Conflicts:** If port 5000 or 5173 is in use, modify the `PORT` in `.env` or check for running processes.
=======
# Kreativity
>>>>>>> 71cd307293f3d842551c62d77b06e7e80c46161a
