# Projects & Expenses Tracker

A simple full-stack web application for tracking projects and their associated expenses. Built with Next.js, Express, and PostgreSQL.

## Project Overview

This application allows users to:
- Create projects with client information and estimated budgets
- Track expenses for each project (materials, labor, other)
- View calculated totals and remaining budgets
- Manage expenses with full CRUD operations

## Technology Stack

**Frontend:**
- Next.js 14 with React 18
- TypeScript
- CSS (no UI frameworks)

**Backend:**
- Node.js with Express
- PostgreSQL database
- CORS for cross-origin requests

## Database Schema

### Projects Table
```sql
CREATE TABLE projects (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    client_name VARCHAR(255) NOT NULL,
    estimated_budget DECIMAL(12, 2) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### Expenses Table
```sql
CREATE TABLE expenses (
    id SERIAL PRIMARY KEY,
    project_id INTEGER NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
    description TEXT NOT NULL,
    amount DECIMAL(12, 2) NOT NULL,
    category VARCHAR(50) NOT NULL CHECK (category IN ('material', 'labor', 'other')),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

## Setup Instructions

### Prerequisites
- Node.js (v18 or higher)
- PostgreSQL
- npm or yarn

### 1. Database Setup

1. Create a PostgreSQL database:
```sql
CREATE DATABASE projects_expenses_db;
```

2. Run the schema file to create tables:
```bash
psql -d projects_expenses_db -f backend/db/schema.sql
```

### 2. Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create environment file:
```bash
cp .env.example .env
```

4. Edit `.env` with your database connection:
```
DATABASE_URL=postgresql://username:password@localhost:5432/projects_expenses_db
PORT=3001
```

5. Start the backend server:
```bash
npm run dev
```

The backend will run on `http://localhost:3001`

### 3. Frontend Setup

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

The frontend will run on `http://localhost:3000`

## API Endpoints

### Projects
- `GET /projects` - Get all projects with expense totals
- `POST /projects` - Create a new project
- `GET /projects/:id` - Get a specific project with expenses

### Expenses
- `POST /projects/:id/expenses` - Add expense to a project
- `PUT /expenses/:id` - Update an expense
- `DELETE /expenses/:id` - Delete an expense

## Features

### Project Management
- Create projects with name, client, and budget
- View project list with calculated totals
- Expandable project details

### Expense Tracking
- Add expenses with description, amount, and category
- Edit existing expenses inline
- Delete expenses with confirmation
- Automatic budget recalculation

### Calculations
The application calculates:
- **Total Expenses**: Sum of all expenses for a project
- **Remaining Budget**: Estimated Budget - Total Expenses

These calculations are performed using SQL queries and are not stored in the database.

## Assumptions Made

1. **Currency**: All amounts are treated as USD
2. **No Authentication**: The application is for internal use without user accounts
3. **Single Database**: Assumes a single PostgreSQL instance
4. **No File Uploads**: All data is text-based
5. **Simple Validation**: Basic input validation without complex business rules

## Potential Improvements

With more time, the following enhancements could be implemented:

### Backend Improvements
- Input validation middleware
- Database connection pooling
- API rate limiting
- Comprehensive error handling
- Database migrations
- Unit and integration tests

### Frontend Improvements
- Loading states and spinners
- Error boundary components
- Form validation with better UX
- Data visualization (charts for expenses)
- Search and filtering capabilities
- Responsive design for mobile devices

### Features
- User authentication and authorization
- Project status tracking
- Expense categories management
- Export functionality (PDF, Excel)
- Dashboard with analytics
- Project templates
- Expense approval workflows

### Technical Improvements
- Containerization with Docker
- CI/CD pipeline
- Environment-specific configurations
- Performance monitoring
- Security enhancements

## Development Notes

- The codebase follows a simple, readable structure suitable for junior developers
- No over-engineering or unnecessary abstractions
- Direct database queries instead of ORMs for transparency
- Functional React components with hooks
- TypeScript for type safety

## License

This project is for educational and internal use purposes.
