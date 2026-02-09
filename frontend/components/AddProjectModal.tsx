import { useState } from 'react'

interface AddProjectModalProps {
  onClose: () => void
  onProjectAdded: () => void
}

export default function AddProjectModal({ onClose, onProjectAdded }: AddProjectModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    client_name: '',
    estimated_budget: ''
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
      const response = await fetch('http://localhost:3001/projects', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          estimated_budget: parseFloat(formData.estimated_budget)
        }),
      })

      if (response.ok) {
        onProjectAdded()
      } else {
        const errorData = await response.json()
        setError(errorData.error || 'Failed to create project')
      }
    } catch (error) {
      setError('Network error. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="modal">
      <div className="modal-content">
        <div className="modal-header">
          <h2>Add New Project</h2>
        </div>

        {error && (
          <div style={{ color: '#e74c3c', marginBottom: '15px' }}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Project Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="client_name">Client Name</label>
            <input
              type="text"
              id="client_name"
              name="client_name"
              value={formData.client_name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="estimated_budget">Estimated Budget</label>
            <input
              type="number"
              id="estimated_budget"
              name="estimated_budget"
              value={formData.estimated_budget}
              onChange={handleChange}
              step="0.01"
              min="0.01"
              required
            />
          </div>

          <div className="modal-footer">
            <button 
              type="button" 
              className="btn" 
              onClick={onClose}
              disabled={loading}
            >
              Cancel
            </button>
            <button 
              type="submit" 
              className="btn btn-success" 
              disabled={loading}
            >
              {loading ? 'Creating...' : 'Create Project'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
