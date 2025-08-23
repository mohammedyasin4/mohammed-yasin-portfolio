import React from 'react'

export default function ProjectCard({ project }) {
  return (
    <article style={{ border: '1px solid #e5e7eb', padding: '1rem', marginBottom: '1rem' }}>
      <img src={project.imageUrl} alt={project.title} style={{ width: '100%', height: 'auto' }} />
      <h3>{project.title}</h3>
      <p>{project.description}</p>
      {project.tags && (
        <ul style={{ display: 'flex', flexWrap: 'wrap', listStyle: 'none', paddingLeft: 0 }}>
          {project.tags.map((tag) => (
            <li key={tag} style={{ marginRight: '0.5rem', backgroundColor: '#eef2ff', padding: '0.25rem 0.5rem', borderRadius: '0.25rem' }}>
              {tag}
            </li>
          ))}
        </ul>
      )}
    </article>
  )
}