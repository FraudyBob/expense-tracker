# How the Application Works

This document explains how the Projects & Expenses Tracker application functions from a user and technical perspective.

## User Workflow

### 1. Creating a Project
1. User clicks "Add Project" button
2. A modal popup appears with form fields:
   - Project Name
   - Client Name  
   - Estimated Budget
3. User fills the form and submits
4. Project appears in the project list

### 2. Viewing Projects
- Main page shows all projects as cards
- Each card displays:
  - Project name and client
  - Estimated budget
  - Total expenses spent
  - Remaining budget (green if positive, red if negative)
- Projects are sorted by creation date (newest first)

### 3. Managing Expenses
1. User clicks on a project card to expand it
2. Expanded view shows:
   - "Add Expense" button
   - List of existing expenses
3. Adding expenses:
   - Click "Add Expense" → Form appears
   - Fill: Description, Amount, Category
   - Submit → Expense appears in list
4. Editing expenses:
   - Click "Edit" on any expense
   - Inline form appears with current values
   - Modify and save or cancel
5. Deleting expenses:
   - Click "Delete" → Confirmation dialog
   - Confirm → Expense removed

## Technical Workflow

### Frontend (Next.js/React)

#### Component Structure
```
pages/index.tsx (Main page)
├── AddProjectModal.tsx (Add new project)
├── ProjectCard.tsx (Individual project display)
    ├── ExpenseForm.tsx (Add expense form)
    └── ExpenseList.tsx (List and manage expenses)
```

#### State Management
- **Main Page**: Holds list of all projects
- **Project Cards**: Track if expanded, show expense form
- **Expense List**: Track editing state, form data

#### Data Flow
1. **Page Load**: Fetches all projects from backend
2. **User Actions**: Send API requests to backend
3. **Updates**: Refetch data and refresh UI

### Backend (Express/PostgreSQL)

#### Request Processing
1. **Receive Request**: Express router receives HTTP request
2. **Validation**: Controller validates input data
3. **Database Operation**: Query executes in PostgreSQL
4. **Response**: Success/error response sent to frontend

#### API Endpoints
```
Projects:
- GET /projects → Get all projects with calculated totals
- POST /projects → Create new project
- GET /projects/:id → Get specific project with expenses

Expenses:
- POST /projects/:id/expenses → Add expense to project
- PUT /expenses/:id → Update existing expense
- DELETE /expenses/:id → Delete expense
```

### Database Operations

#### Projects Table
- Stores basic project information
- No calculated fields (computed in queries)

#### Expenses Table
- Stores individual expense records
- Linked to projects via foreign key

#### Calculations (SQL)
```sql
-- Total expenses per project
COALESCE(SUM(e.amount), 0) as total_expenses

-- Remaining budget
p.estimated_budget - COALESCE(SUM(e.amount), 0) as remaining_budget
```

## Real-time Updates

### When User Adds/Edits/Deletes Expense:
1. Frontend sends API request
2. Backend processes and updates database
3. Backend responds with success
4. Frontend refetches project data
5. UI updates with new totals
6. Budget amounts recalculate automatically

### Data Consistency
- All calculations happen in database queries
- Frontend only displays what backend provides
- No duplicate data storage
- Single source of truth = database

## Error Handling

### Frontend
- Network errors: Show "Network error" message
- Validation errors: Display specific error messages
- Loading states: Show loading indicators

### Backend
- Invalid data: Return 400 with error message
- Not found: Return 404
- Database errors: Return 500 with generic message

## Security Considerations

### Input Validation
- Required fields checked
- Numeric values validated
- Categories restricted to allowed values

### Data Protection
- Environment variables for database credentials
- CORS configured for specific origins
- No sensitive data in frontend code

## Performance

### Database
- Indexes on foreign keys and timestamps
- Efficient SQL queries with JOINs
- Calculations done in database, not application

### Frontend
- Component re-rendering optimized
- Only fetch needed data
- Simple CSS for fast loading

This architecture ensures the application is reliable, maintainable, and provides a smooth user experience.
