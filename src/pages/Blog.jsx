import React, { useEffect, useState } from 'react'
import { fetchBlogPosts } from '../sanity'

export default function Blog() {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    async function load() {
      try {
        const data = await fetchBlogPosts()
        setPosts(data)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }
    load()
    console.log(post.body[0].children[0])
  }, [])

  return (
    <main className="container">
      <h1>Blog</h1>
      {loading && <p>Loading posts...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <ul style={{ listStyle: 'none', paddingLeft: 0 }}>
        {posts.map((post) => (
          <li key={post._id} style={{ borderBottom: '1px solid #e5e7eb', paddingBottom: '1rem', marginBottom: '1rem' }}>
            <h2>{post.title}</h2>
            {post.publishedAt && (
              <p style={{ fontSize: '0.875rem', color: '#6b7280', marginBottom: '0.5rem' }}>
                {new Date(post.publishedAt).toLocaleDateString()}
              </p>
            )}
            {/* If the body is an array of blocks, show the first block’s text */}
            {Array.isArray(post.body) &&
              post.body[0] &&
              post.body[0].children &&
              post.body[0].children[0] && (
                <p>{post.body[0].children[0].text.slice(0, 200)}...</p>      
              )}
              { /*<img src={post.body[0].children[0].image.asset.url} style={{ maxWidth: '100%', marginBottom: '1rem' }} />*/}
                
          </li>
        ))}
      </ul>
    </main>
  )
}