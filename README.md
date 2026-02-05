## Task Management App – MERN Stack

A full-stack Task Manager application built using MongoDB, Express.js, React.js, and Node.js, including authentication (JWT), profile management, and task CRUD operations.

 ## Tech Stack
### Frontend

React.js

React Router

Axios

TailwindCSS

React Toastify

### Backend

Node.js

Express.js

MongoDB + Mongoose

JWT Authentication

CORS

## Tools

Postman (API testing)

Nodemon / Vite

bcryptjs

## Backend Setup (Node + Express)
1. Go to backend folder
``` cd backend ```

2. Install dependencies
``` npm install ```

3. Create .env file
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/taskmanager
JWT_SECRET=your_jwt_secret_key
JWT_EXPIRES_IN=7d

4. Start backend
``` npm run dev ```


## Backend runs on:
http://localhost:5000

## Frontend Setup (React + Vite)
1. Go to frontend
``` cd frontend ```

2. Install dependencies
``` npm install ```

3. Create .env file
VITE_API_URL=http://localhost:5000/api/v1

4. Start frontend
``` npm run dev ```


## Frontend runs on:
http://localhost:5173

## API Endpoints (Postman Collection)

Here is a Postman collection:

{
  "info": {
    "name": "MERN Task Manager API",
    "_postman_id": "your-id",
    "schema": "https://schema.getpostman.com/json/collection/v2.1.0/collection.json"
  },
  "item": [
    {
      "name": "Auth",
      "item": [
        {
          "name": "Register",
          "request": {
            "method": "POST",
            "header": [],
            "body": {
              "mode": "raw",
              "raw": "{\n  \"name\":\"John Doe\",\n  \"email\":\"john@mail.com\",\n  \"password\":\"123456\"\n}",
              "options": { "raw": { "language": "json" } }
            },
            "url": "{{url}}/auth/register"
          }
        },
        {
          "name": "Login",
          "request": {
            "method": "POST",
            "url": "{{url}}/auth/login",
            "body": {
              "mode": "raw",
              "raw": "{ \"email\": \"john@mail.com\", \"password\": \"123456\" }"
            }
          }
        }
      ]
    },
    {
      "name": "Profile",
      "item": [
        {
          "name": "Get Profile",
          "request": {
            "method": "GET",
            "url": "{{url}}/me"
          }
        },
        {
          "name": "Update Profile",
          "request": {
            "method": "PUT",
            "url": "{{url}}/me",
            "body": {
              "mode": "raw",
              "raw": "{ \"name\": \"Updated Name\" }"
            }
          }
        }
      ]
    },
    {
      "name": "Tasks",
      "item": [
        {
          "name": "Create Task",
          "request": {
            "method": "POST",
            "url": "{{url}}/tasks",
            "body": {
              "mode": "raw",
              "raw": "{ \"title\": \"Test Task\", \"description\": \"Hello\" }"
            }
          }
        },
        {
          "name": "Get All Tasks",
          "request": {
            "method": "GET",
            "url": "{{url}}/tasks"
          }
        }
      ]
    }
  ],
  "variable": [
    {
      "key": "url",
      "value": "http://localhost:5000/api/v1"
    }
  ]
}

### How to Run the Full App
## Start Backend
cd backend
``` npm run dev ```

## Start Frontend
cd frontend
``` npm run dev ```


## Open in browser:
http://localhost:5173

### Scaling for Production (Short 10-line Summary)

## To scale this application for production:

1. Deploy Frontend on Vercel / Netlify and Backend on Render / Railway / AWS

2. Use HTTPS everywhere

3. Configure CORS whitelist instead of cors() open policy

4. Store secrets in environment variables using platforms’ secret managers

5. Enable MongoDB indexes on frequent filters (userId, createdAt)

6. Add rate limiting + helmet.js for security

7. Use Redis caching for frequent queries (user & tasks)

8. Use Cloudflare or load balancer for DDOS protection

9. Enable horizontal scaling with Docker containers

10. Use PM2 to keep backend alive in production
