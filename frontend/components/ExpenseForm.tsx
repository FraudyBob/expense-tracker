import { useState } from 'react'

interface ExpenseFormProps {
  projectId: number
  onExpenseAdded: () => void
}

export default function ExpenseForm({ projectId, onExpenseAdded }: ExpenseFormProps) {
  const [formData, setFormData] = useState({
    description: '',
    amount: '',
    category: 'material'
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const response = await fetch(`http://localhost:3001/expenses/projects/${projectId}/expenses`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          amount: parseFloat(formData.amount)
        }),
      })

      if (response.ok) {
        onExpenseAdded()
        setFormData({
          description: '',
          amount: '',
          category: 'material'
        })
      } else {
        const errorData = await response.json()
        setError(errorData.error || 'Failed to create expense')
      }
    } catch (error) {
      setError('Network error. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="expense-form">
      <h4>Add New Expense</h4>
      
      {error && (
        <div style={{ color: '#e74c3c', marginBottom: '15px' }}>
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="description">Description</label>
          <input
            type="text"
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="amount">Amount</label>
          <input
            type="number"
            id="amount"
            name="amount"
            value={formData.amount}
            onChange={handleChange}
            step="0.01"
            min="0.01"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="category">Category</label>
          <select
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
          >
            <option value="material">Material</option>
            <option value="labor">Labor</option>
            <option value="other">Other</option>
          </select>
        </div>

        <button 
          type="submit" 
          className="btn btn-success" 
          disabled={loading}
        >
          {loading ? 'Adding...' : 'Add Expense'}
        </button>
      </form>
    </div>
  )
}
