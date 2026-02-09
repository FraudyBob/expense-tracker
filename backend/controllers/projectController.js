const db = require('../db/queries');

const createProject = async (req, res) => {
  try {
    const { name, client_name, estimated_budget } = req.body;

    if (!name || !client_name || !estimated_budget) {
      return res.status(400).json({ 
        error: 'Missing required fields: name, client_name, estimated_budget' 
      });
    }

    if (isNaN(estimated_budget) || estimated_budget <= 0) {
      return res.status(400).json({ 
        error: 'Estimated budget must be a positive number' 
      });
    }

    const project = await db.createProject(name, client_name, parseFloat(estimated_budget));
    res.status(201).json(project);
  } catch (error) {
    console.error('Error creating project:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const getAllProjects = async (req, res) => {
  try {
    const projects = await db.getAllProjectsWithExpenses();
    res.json(projects);
  } catch (error) {
    console.error('Error fetching projects:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const getProjectById = async (req, res) => {
  try {
    const { id } = req.params;
    
    if (isNaN(id)) {
      return res.status(400).json({ error: 'Invalid project ID' });
    }

    const project = await db.getProjectById(id);
    
    if (!project) {
      return res.status(404).json({ error: 'Project not found' });
    }

    const expenses = await db.getExpensesByProjectId(id);
    
    res.json({
      ...project,
      expenses
    });
  } catch (error) {
    console.error('Error fetching project:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = {
  createProject,
  getAllProjects,
  getProjectById
};
