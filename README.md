# USSD App with Node.js, Express & Africa's Talking API

This is a simple USSD application built with **Node.js**, **Express**, **MongoDB**, and **Africa's Talking API**. It allows users to interact with a USSD menu, store data in MongoDB, and handle callbacks using **ngrok** for local development.

---

## Features

* Interactive USSD menu using Africa's Talking API
* MongoDB database for storing user data
* Environment variables for secure configuration
* Local development with **ngrok** for public URLs
* Basic Express server setup

---

## Prerequisites

Make sure you have installed:

* [Node.js](https://nodejs.org/)
* [MongoDB](https://www.mongodb.com/)
* [Ngrok](https://ngrok.com/)
* Africa's Talking **sandbox account**

---

## Setup Instructions

### 1. Clone the repository

```bash
git clone https://github.com/your-username/ussd-app.git
cd ussd-app
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure Environment Variables

Create a `.env` file in the project root:

```
PORT=3000
MONGO_URI=mongodb://127.0.0.1:27017/ussdapp

# Africa's Talking Credentials
AT_API_KEY=your-api-key
AT_USERNAME=sandbox
AT_ENVIRONMENT=sandbox

# USSD Product Name (if using payments)
AT_PRODUCT_NAME=ussdProduct

# Ngrok callback URL
AT_CALLBACK_URL=https://your-ngrok-url/ussd
```

---

### 4. Run the Server

```bash
npm start
```

Server will run on `http://localhost:3000`.

---

### 5. Start Ngrok

```bash
ngrok http 3000
```

Copy the generated HTTPS URL and update `AT_CALLBACK_URL` in `.env` and on Africa's Talking dashboard.

---
