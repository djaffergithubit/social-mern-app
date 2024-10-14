# Social MERN App with Chat Functionality

## Table of Contents
- [Introduction](#introduction)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Getting Started](#getting-started)
- [Usage](#usage)

## Introduction
Welcome to the **Social MERN App**! This is a social networking application inspired by Instagram, built using the MERN stack (MongoDB, Express.js, React, and Node.js) with integrated chat functionality. Users can connect, share updates, and engage in real-time conversations.

## Features
- User authentication (sign up, log in, log out)
- User profiles with customizable settings
- Follow a user and Unfollow a user
- Post updates with images and text
- Real-time chat between users
- Notifications for friend requests and messages
- Responsive design for mobile and desktop

## Technologies Used
- **Frontend:**
  - React.js
  - Redux for state management
  - Axios for HTTP requests
  - Socket.IO for real-time communication
  - tailwindCSS for styling

- **Backend:**
  - Node.js
  - Express.js
  - MongoDB (Mongoose for database management)
  - JWT for authentication
  - Socket.IO for real-time communication

## Getting Started
To get a local copy of the project up and running, follow these steps:

### Prerequisites
Make sure you have the following installed:
- Node.js
- npm (Node Package Manager)
- MongoDB

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/djaffergithubit/social-mern-app.git
   cd social-mern-app

2. Install backend dependencies
    ```bash
    cd server
    npm install

3. Install frontend dependencies
    ```bash
    cd client
    npm install

4. Set up environment variables:
    ```bash
    MONGO_URL=your_mongodb_uri
    PORT= port
    SECRET_TOKEN=your_jwt_secret

5. start the backend server
    ```bash
    cd server
    npm run dev

6. start frontend Application
    ```bash
    cd client
    npm run dev

### Usage
    - Open your browser and navigate to http://localhost:5173 to access the application.
    - Create an account or log in with existing credentials.
    - Explore user profiles, create posts, and chat with friends in real-time.