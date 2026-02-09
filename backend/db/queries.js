const pool = require('./connection');

// Projects queries
const createProject = async (name, client_name, estimated_budget) => {
  const query = `
    INSERT INTO projects (name, client_name, estimated_budget)
    VALUES ($1, $2, $3)
    RETURNING *
  `;
  const values = [name, client_name, estimated_budget];
  const result = await pool.query(query, values);
  return result.rows[0];
};

const getAllProjectsWithExpenses = async () => {
  const query = `
    SELECT 
      p.id,
      p.name,
      p.client_name,
      p.estimated_budget,
      p.created_at,
      COALESCE(SUM(e.amount), 0) as total_expenses,
      p.estimated_budget - COALESCE(SUM(e.amount), 0) as remaining_budget
    FROM projects p
    LEFT JOIN expenses e ON p.id = e.project_id
    GROUP BY p.id, p.name, p.client_name, p.estimated_budget, p.created_at
    ORDER BY p.created_at DESC
  `;
  const result = await pool.query(query);
  return result.rows;
};

const getProjectById = async (id) => {
  const query = `
    SELECT 
      p.id,
      p.name,
      p.client_name,
      p.estimated_budget,
      p.created_at,
      COALESCE(SUM(e.amount), 0) as total_expenses,
      p.estimated_budget - COALESCE(SUM(e.amount), 0) as remaining_budget
    FROM projects p
    LEFT JOIN expenses e ON p.id = e.project_id
    WHERE p.id = $1
    GROUP BY p.id, p.name, p.client_name, p.estimated_budget, p.created_at
  `;
  const result = await pool.query(query, [id]);
  return result.rows[0];
};

// Expenses queries
const createExpense = async (project_id, description, amount, category) => {
  const query = `
    INSERT INTO expenses (project_id, description, amount, category)
    VALUES ($1, $2, $3, $4)
    RETURNING *
  `;
  const values = [project_id, description, amount, category];
  const result = await pool.query(query, values);
  return result.rows[0];
};

const getExpensesByProjectId = async (project_id) => {
  const query = `
    SELECT id, description, amount, category, created_at
    FROM expenses
    WHERE project_id = $1
    ORDER BY created_at DESC
  `;
  const result = await pool.query(query, [project_id]);
  return result.rows;
};

const updateExpense = async (id, description, amount, category) => {
  const query = `
    UPDATE expenses
    SET description = $1, amount = $2, category = $3
    WHERE id = $4
    RETURNING *
  `;
  const values = [description, amount, category, id];
  const result = await pool.query(query, values);
  return result.rows[0];
};

const deleteExpense = async (id) => {
  const query = 'DELETE FROM expenses WHERE id = $1 RETURNING *';
  const result = await pool.query(query, [id]);
  return result.rows[0];
};

module.exports = {
  createProject,
  getAllProjectsWithExpenses,
  getProjectById,
  createExpense,
  getExpensesByProjectId,
  updateExpense,
  deleteExpense
};
