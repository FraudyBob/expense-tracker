import { useState, useEffect } from 'react'
import Head from 'next/head'
import ProjectCard from '../components/ProjectCard'
import AddProjectModal from '../components/AddProjectModal'

interface Project {
  id: number
  name: string
  client_name: string
  estimated_budget: number
  total_expenses: number
  remaining_budget: number
  created_at: string
}

export default function Home() {
  const [projects, setProjects] = useState<Project[]>([])
  const [showAddModal, setShowAddModal] = useState(false)
  const [loading, setLoading] = useState(true)

  const fetchProjects = async () => {
    try {
      const response = await fetch('http://localhost:3001/projects')
      if (response.ok) {
        const data = await response.json()
        setProjects(data)
      }
    } catch (error) {
      console.error('Error fetching projects:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchProjects()
  }, [])

  const handleProjectAdded = () => {
    fetchProjects()
    setShowAddModal(false)
  }

  const handleProjectUpdated = () => {
    fetchProjects()
  }

  if (loading) {
    return (
      <div className="container">
        <div className="header">
          <h1>Projects & Expenses Tracker</h1>
        </div>
        <p>Loading projects...</p>
      </div>
    )
  }

  return (
    <>
      <Head>
        <title>Projects & Expenses Tracker</title>
        <meta name="description" content="Track projects and expenses" />
      </Head>

      <div className="container">
        <div className="header">
          <h1>Projects & Expenses Tracker</h1>
        </div>

        <div style={{ marginBottom: '20px' }}>
          <button 
            className="btn" 
            onClick={() => setShowAddModal(true)}
          >
            Add Project
          </button>
        </div>

        {projects.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '40px' }}>
            <p>No projects found. Create your first project to get started!</p>
          </div>
        ) : (
          projects.map(project => (
            <ProjectCard 
              key={project.id} 
              project={project} 
              onUpdate={handleProjectUpdated}
            />
          ))
        )}

        {showAddModal && (
          <AddProjectModal 
            onClose={() => setShowAddModal(false)}
            onProjectAdded={handleProjectAdded}
          />
        )}
      </div>
    </>
  )
}
