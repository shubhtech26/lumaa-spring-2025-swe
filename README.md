# Task Management Application

## Overview
This is a full-stack **Task Management Application** built with:
- **Frontend**: React + TypeScript
- **Backend**: Node.js + Express
- **Database**: PostgreSQL

The application allows users to:
- **Register** and **Log in**.
- **View**, **create**, **update**, and **delete tasks**.

---

## Features

### 1. Authentication
- Register a new user.
- Log in with an existing user.
- Securely hash passwords using `bcrypt`.
- Protect task routes using JWT (JSON Web Tokens).

### 2. Tasks CRUD
- View a list of tasks.
- Create a new task.
- Update an existing task (e.g., mark as complete, edit text).
- Delete a task.

---


## Setup Instructions

### Prerequisites
1. **Node.js**: Install from [here](https://nodejs.org/).
2. **PostgreSQL**: Install from [here](https://www.postgresql.org/download/).

### Step 1: Set Up the Database

1. Access the PostgreSQL CLI:
   ```bash
   psql postgres
   ```
2. Create a new database:
   ```sql
   CREATE DATABASE taskdb;
   ```
3. Create a new user with a password:
   ```sql
   CREATE USER taskuser WITH PASSWORD 'password';
   ```
4. Grant privileges to the user:
   ```sql
   GRANT ALL PRIVILEGES ON DATABASE taskdb TO taskuser;
   GRANT ALL PRIVILEGES ON SCHEMA public TO taskuser;
   GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO taskuser;
   GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA public TO taskuser;
   ```
5. Exit the PostgreSQL CLI:
   ```sql
   \q
   ```

---

### Step 2: Set Up the Backend

1. Navigate to the backend folder:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the backend folder and add the following:
   ```env
   DATABASE_URL=
   JWT_SECRET=
   PORT=
   ```
   Replace `taskuser`, `password`, and `your_jwt_secret_key` with actual values.
4. Start the backend server:
   ```bash
   npm run start
   ```

---

### Step 3: Set Up the Frontend

1. Navigate to the frontend folder:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the frontend folder and add the following:
   ```env
   REACT_APP_API_URL=http://localhost:3001
   ```
   Replace `http://localhost:3001` with the URL where your backend server is running.
4. Start the frontend application:
   ```bash
   npm start
   ```

---

### Step 4: Test the Application

1. Open the frontend application in your browser (usually at `http://localhost:3000`).
2. Register a new user using the **Register** form.
3. Log in with the registered user.
4. Perform the following actions:
   - **Create a new task**.
   - **View the list of tasks**.
   - **Update a task** (e.g., mark as complete, edit text).
   - **Delete a task**.

---

## Video Demo
Watch the video demo here: https://drive.google.com/file/d/1hFulm5DsTtf6n1oldvWU2E-Y7FW-WtaL/view?usp=drive_link

---

## Troubleshooting

### 1. Database Connection Issues:
- Ensure PostgreSQL is running.
- Verify the database credentials in the `.env` file.

### 2. Frontend-Backend Communication:
- Ensure the backend server is running and accessible at the URL specified in `REACT_APP_API_URL`.

---

## License
This project is licensed under the MIT License. See the `LICENSE` file for details.

---

## Notes
- **Backend**: Built with Node.js and Express.
- **Frontend**: Built with React and TypeScript.
- **Authentication**: Handled using JWT.
- **Database**: PostgreSQL with proper user privileges.

---

## Salary Expectations
My monthly salary expectation is 20$/hr or 2000$/month






