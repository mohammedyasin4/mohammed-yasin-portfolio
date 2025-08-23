import React, { useEffect, useState } from 'react'
import { fetchAuthor } from '../sanity'

export default function About() {
  const [author, setAuthor] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    async function load() {
      try {
        const data = await fetchAuthor()
        setAuthor(data)
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
    <h1>About</h1>
    {loading && <p>Loading author...</p>}
    {error && <p style={{ color: 'red' }}>{error}</p>}

    {!loading && !error && !author && (
      <p>No author found. Make sure you published your Author document in Studio.</p>
    )}

    {author && (
      <div>
        {author.imageUrl && (
          <img
            src={author.imageUrl}
            alt={author.name || 'Author photo'}
            style={{ width: '150px', borderRadius: '50%' }}
          />
        )}
        <h2>{author.name || 'Unnamed Author'}</h2>
        <p>{author.bioPlain || 'No bio yet.'}</p>
      </div>
    )}
  </main>
)

}