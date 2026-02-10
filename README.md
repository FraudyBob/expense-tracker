Projects & Expenses Tracker

A simple internal web application to manage projects, track expenses, and monitor remaining budgets.

This project was built as a full-stack assessment using a straightforward CRUD-based approach with a clear separation between frontend, backend, and database.

Features
-Create projects with an estimated budget
-Add expenses to projects
-View total expenses and remaining budget per project
-Edit and delete expenses
-Expandable project view to see expense details

Tech Stack
Frontend
-Next.js
-React
-TypeScript
-CSS

Backend
-Node.js
-Express.js

Database
-PostgreSQL

Project Structure
ExpenseTracker/
├── backend/
├── frontend/
├── README.md
├── Tech-Stack.md
├── Working.md
└── Project-Creation-Guide.md

Setup Instructions
1. Database Setup

-Ensure PostgreSQL is running
-Create a database:
CREATE DATABASE expense_tracker;

Run the schema file located at:
backend/db/schema.sql

2. Backend Setup
-cd backend
-npm install


Create a .env file in the backend folder:

PORT=3001
DATABASE_URL=postgresql://<username>:<password>@localhost:5432/expense_tracker


Start the backend:
npm run dev


Backend runs on:
http://localhost:3001

3. Frontend Setup
cd frontend
npm install
npm run dev


Frontend runs on:

http://localhost:3000

API Overview:

Projects
-GET /projects
-POST /projects
-GET /projects/:id

Expenses
-POST /projects/:id/expenses
-PUT /expenses/:id
-DELETE /expenses/:id

Database Design:
-projects table stores project details and estimated budget
-expenses table stores individual expenses linked to projects
-Total expenses and remaining budget are calculated in SQL queries and not stored

Assumptions
-Single currency is used
-No authentication or role-based access
-Intended for internal use only
-No pagination or advanced filtering

Improvements With More Time
-Authentication and user roles
-Pagination for large datasets
-Better error handling and UI feedback
-Unit and integration tests
-Deployment configuration