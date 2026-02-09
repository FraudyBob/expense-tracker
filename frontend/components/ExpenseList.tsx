import { useState, useEffect } from 'react'

interface Expense {
  id: number
  description: string
  amount: number
  category: string
  created_at: string
}

interface ExpenseListProps {
  projectId: number
  onExpenseUpdated: () => void
}

export default function ExpenseList({ projectId, onExpenseUpdated }: ExpenseListProps) {
  const [expenses, setExpenses] = useState<Expense[]>([])
  const [loading, setLoading] = useState(true)
  const [editingExpense, setEditingExpense] = useState<number | null>(null)
  const [editForm, setEditForm] = useState({
    description: '',
    amount: '',
    category: 'material'
  })

  const fetchExpenses = async () => {
    try {
      const response = await fetch(`http://localhost:3001/projects/${projectId}`)
      if (response.ok) {
        const data = await response.json()
        setExpenses(data.expenses || [])
      }
    } catch (error) {
      console.error('Error fetching expenses:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchExpenses()
  }, [projectId])

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'AED'
    }).format(amount)
  }

  const startEdit = (expense: Expense) => {
    setEditingExpense(expense.id)
    setEditForm({
      description: expense.description,
      amount: expense.amount.toString(),
      category: expense.category
    })
  }

  const cancelEdit = () => {
    setEditingExpense(null)
    setEditForm({
      description: '',
      amount: '',
      category: 'material'
    })
  }

  const handleEditChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setEditForm(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const saveEdit = async (expenseId: number) => {
    try {
      const response = await fetch(`http://localhost:3001/expenses/${expenseId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...editForm,
          amount: parseFloat(editForm.amount)
        }),
      })

      if (response.ok) {
        onExpenseUpdated()
        fetchExpenses()
        cancelEdit()
      }
    } catch (error) {
      console.error('Error updating expense:', error)
    }
  }

  const deleteExpense = async (expenseId: number) => {
    if (!confirm('Are you sure you want to delete this expense?')) {
      return
    }

    try {
      const response = await fetch(`http://localhost:3001/expenses/${expenseId}`, {
        method: 'DELETE',
      })

      if (response.ok) {
        onExpenseUpdated()
        fetchExpenses()
      }
    } catch (error) {
      console.error('Error deleting expense:', error)
    }
  }

  if (loading) {
    return <p>Loading expenses...</p>
  }

  if (expenses.length === 0) {
    return <p>No expenses recorded for this project.</p>
  }

  return (
    <div className="expense-list">
      <h4>Expenses</h4>
      {expenses.map(expense => (
        <div key={expense.id} className="expense-item">
          {editingExpense === expense.id ? (
            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', gap: '10px', marginBottom: '10px' }}>
                <input
                  type="text"
                  name="description"
                  value={editForm.description}
                  onChange={handleEditChange}
                  style={{ flex: 1 }}
                />
                <input
                  type="number"
                  name="amount"
                  value={editForm.amount}
                  onChange={handleEditChange}
                  step="0.01"
                  min="0.01"
                  style={{ width: '100px' }}
                />
                <select
                  name="category"
                  value={editForm.category}
                  onChange={handleEditChange}
                  style={{ width: '100px' }}
                >
                  <option value="material">Material</option>
                  <option value="labor">Labor</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div>
                <button 
                  className="btn btn-success btn-small" 
                  onClick={() => saveEdit(expense.id)}
                >
                  Save
                </button>
                <button 
                  className="btn btn-small" 
                  onClick={cancelEdit}
                >
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <>
              <div className="expense-info">
                <div className="expense-description">{expense.description}</div>
                <div className="expense-meta">
                  {expense.category} • {new Date(expense.created_at).toLocaleDateString()}
                </div>
              </div>
              <div className="expense-amount">
                {formatCurrency(expense.amount)}
              </div>
              <div className="expense-actions">
                <button 
                  className="btn btn-small" 
                  onClick={() => startEdit(expense)}
                >
                  Edit
                </button>
                <button 
                  className="btn btn-danger btn-small" 
                  onClick={() => deleteExpense(expense.id)}
                >
                  Delete
                </button>
              </div>
            </>
          )}
        </div>
      ))}
    </div>
  )
}
