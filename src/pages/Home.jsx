import React, { useEffect, useState } from 'react'
import { fetchProjects } from '../sanity'
import ProjectCard from '../components/ProjectCard'

export default function Home() {
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    async function load() {
      try {
        const data = await fetchProjects()
        setProjects(data.slice(0, 3))
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [])

  return (
    <main className="container">
      <h1>Welcome to my portfolio</h1>
      {loading && <p>Loading projects...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {projects.map((project) => (
        <ProjectCard key={project._id} project={project} />
      ))}
    </main>
  )
}