import React, { useState } from 'react'
import { createCategory, updateAuthorBio, fetchAuthor } from '../sanity'

export default function Admin() {
  const [categoryTitle, setCategoryTitle] = useState('')
  const [bio, setBio] = useState('')
  const [message, setMessage] = useState('')

  async function handleCreateCategory(e) {
    e.preventDefault()
    if (!categoryTitle) return
    try {
      await createCategory(categoryTitle)
      setMessage(`Created category "${categoryTitle}" successfully!`)
      setCategoryTitle('')
    } catch (err) {
      setMessage(`Error creating category: ${err.message}`)
    }
  }

  async function handleUpdateBio(e) {
    e.preventDefault()
    if (!bio) return
    try {
      const author = await fetchAuthor()
      await updateAuthorBio(author._id, bio)
      setMessage('Updated biography successfully!')
      setBio('')
    } catch (err) {
      setMessage(`Error updating bio: ${err.message}`)
    }
  }

  return (
    <main className="container">
      <h1>Admin</h1>
      <form onSubmit={handleCreateCategory} style={{ marginBottom: '2rem' }}>
        <h2>Create Category</h2>
        <input
          type="text"
          value={categoryTitle}
          onChange={(e) => setCategoryTitle(e.target.value)}
          placeholder="Category name"
        />
        <button type="submit">Create</button>
      </form>
      <form onSubmit={handleUpdateBio}>
        <h2>Update Bio</h2>
        <textarea
          value={bio}
          onChange={(e) => setBio(e.target.value)}
          rows="4"
          cols="50"
          placeholder="Enter new biography"
        ></textarea>
        <button type="submit">Update</button>
      </form>
      {message && <p>{message}</p>}
    </main>
  )
}