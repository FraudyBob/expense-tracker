# Tech Stack

This document explains all the technologies used in the Projects & Expenses Tracker application.

## Frontend Technologies

### Next.js
- **What it is**: A React framework for building web applications
- **Why we used it**: Provides server-side rendering, routing, and development tools out of the box
- **Version**: 14.0.0

### React
- **What it is**: A JavaScript library for building user interfaces
- **Why we used it**: Allows creating reusable UI components with state management
- **Version**: 18

### TypeScript
- **What it is**: JavaScript with added types for better code safety
- **Why we used it**: Catches errors early, makes code more readable and maintainable
- **Version**: 5

### CSS
- **What it is**: Styling language for web pages
- **Why we used it**: Simple, no external UI framework needed for this clean application

## Backend Technologies

### Node.js
- **What it is**: JavaScript runtime for server-side code
- **Why we used it**: Allows using JavaScript for both frontend and backend
- **Version**: 18 or higher

### Express.js
- **What it is**: Web framework for Node.js
- **Why we used it**: Simplifies creating API endpoints and handling HTTP requests
- **Version**: 4.18.2

### PostgreSQL
- **What it is**: Powerful relational database
- **Why we used it**: Reliable, supports complex queries, perfect for structured data
- **Version**: Any recent version

### pg (Node.js library)
- **What it is**: PostgreSQL client for Node.js
- **Why we used it**: Direct database connection without ORM complexity
- **Version**: 8.11.3

## Additional Libraries

### CORS
- **What it is**: Enables cross-origin requests between frontend and backend
- **Why we used it**: Frontend (port 3000) needs to talk to backend (port 3001)
- **Version**: 2.8.5

### dotenv
- **What it is**: Loads environment variables from .env file
- **Why we used it**: Keeps database credentials and configuration secure
- **Version**: 16.3.1

### nodemon (Development only)
- **What it is**: Automatically restarts server when code changes
- **Why we used it**: Improves development experience
- **Version**: 3.0.1

## Development Tools

### npm
- **What it is**: Package manager for JavaScript
- **Why we used it**: Installs and manages all project dependencies

### ESLint
- **What it is**: Code quality tool
- **Why we used it**: Maintains consistent code style and catches common errors

## Why This Stack?

1. **Simplicity**: All technologies are widely used and well-documented
2. **Performance**: Fast and efficient for this type of application
3. **Scalability**: Can grow with the application if needed
4. **Development Speed**: Quick setup and development
5. **Maintainability**: Clean, readable code that's easy to understand

## Data Flow

1. **Frontend (Next.js)**: Sends HTTP requests to backend API
2. **Backend (Express)**: Receives requests, validates data, queries database
3. **Database (PostgreSQL)**: Stores and retrieves project and expense data
4. **Response Flow**: Database → Backend → Frontend → User Interface

This stack provides a solid foundation for a clean, professional web application.
