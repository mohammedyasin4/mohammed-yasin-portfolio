import { describe, it, expect } from 'vitest'
import { fetchProjects, fetchBlogPosts, fetchAuthor } from '../src/sanity'

describe('Sample data', () => {
  it('returns sample projects when no projectId is set', async () => {
    const projects = await fetchProjects()
    expect(projects.length).toBeGreaterThan(0)
  })
  it('returns sample posts when no projectId is set', async () => {
    const posts = await fetchBlogPosts()
    expect(posts.length).toBeGreaterThan(0)
  })
  it('returns a sample author when no projectId is set', async () => {
    const author = await fetchAuthor()
    expect(author).toHaveProperty('name')
  })
})