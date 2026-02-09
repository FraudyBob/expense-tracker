import { useState } from 'react'
import ExpenseForm from './ExpenseForm'
import ExpenseList from './ExpenseList'

interface Project {
  id: number
  name: string
  client_name: string
  estimated_budget: number
  total_expenses: number
  remaining_budget: number
  created_at: string
}

interface ProjectCardProps {
  project: Project
  onUpdate: () => void
}

export default function ProjectCard({ project, onUpdate }: ProjectCardProps) {
  const [isExpanded, setIsExpanded] = useState(false)
  const [showExpenseForm, setShowExpenseForm] = useState(false)

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'AED'
    }).format(amount)
  }

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded)
  }

  const handleExpenseAdded = () => {
    onUpdate()
    setShowExpenseForm(false)
  }

  return (
    <div className="project-card">
      <div className="project-header" onClick={toggleExpanded}>
        <div className="project-info">
          <h3>{project.name}</h3>
          <p><strong>Client:</strong> {project.client_name}</p>
          <p><strong>Created:</strong> {new Date(project.created_at).toLocaleDateString()}</p>
        </div>
        <div className="project-budget">
          <div className="budget-amount">
            <strong>Estimated Budget:</strong> {formatCurrency(project.estimated_budget)}
          </div>
          <div className="budget-amount">
            <strong>Total Expenses:</strong> {formatCurrency(project.total_expenses)}
          </div>
          <div className={`budget-amount ${project.remaining_budget >= 0 ? 'budget-positive' : 'budget-negative'}`}>
            <strong>Remaining Budget:</strong> {formatCurrency(project.remaining_budget)}
          </div>
        </div>
      </div>

      {isExpanded && (
        <div className="expense-details">
          <div style={{ marginBottom: '20px' }}>
            <button 
              className="btn" 
              onClick={() => setShowExpenseForm(!showExpenseForm)}
            >
              {showExpenseForm ? 'Cancel' : 'Add Expense'}
            </button>
          </div>

          {showExpenseForm && (
            <ExpenseForm 
              projectId={project.id} 
              onExpenseAdded={handleExpenseAdded}
            />
          )}

          <ExpenseList 
            projectId={project.id} 
            onExpenseUpdated={onUpdate}
          />
        </div>
      )}
    </div>
  )
}
