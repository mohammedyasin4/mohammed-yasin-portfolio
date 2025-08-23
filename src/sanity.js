import { createClient } from '@sanity/client'

// Read configuration from environment variables. `import.meta.env` is defined in Vite; `process.env` is used during testing.
const config = {
  projectId:
    (typeof import.meta !== 'undefined' && import.meta.env && import.meta.env.VITE_SANITY_PROJECT_ID) ||
    process.env.VITE_SANITY_PROJECT_ID ||
    '',
  dataset:
    (typeof import.meta !== 'undefined' && import.meta.env && import.meta.env.VITE_SANITY_DATASET) ||
    process.env.VITE_SANITY_DATASET ||
    'production',
  apiVersion:
    (typeof import.meta !== 'undefined' && import.meta.env && import.meta.env.VITE_SANITY_API_VERSION) ||
    process.env.VITE_SANITY_API_VERSION ||
    '2025-08-01',
  useCdn: false,
  token:
    (typeof import.meta !== 'undefined' && import.meta.env && import.meta.env.VITE_SANITY_TOKEN) ||
    process.env.VITE_SANITY_TOKEN ||
    undefined,
}

export const sanityClient = createClient(config)

// Sample data for offline mode
const sampleProjects = [
  {
    _id: 'sample-project-1',
    title: 'Sample Project One',
    description: 'This is a placeholder project description to show how projects will look.',
    imageUrl: 'https://via.placeholder.com/600x400',
    tags: ['Frontend', 'React'],
  },
  {
    _id: 'sample-project-2',
    title: 'Sample Project Two',
    description: 'Another example of a project. Add your own projects in Sanity Studio.',
    imageUrl: 'https://via.placeholder.com/600x400',
    tags: ['JavaScript', 'API'],
  },
  {
    _id: 'sample-project-3',
    title: 'Sample Project Three',
    description: 'A third sample project. Replace these with real content once connected.',
    imageUrl: 'https://via.placeholder.com/600x400',
    tags: ['CSS', 'Design'],
  },
]

const sampleBlogPosts = [
  {
    _id: 'sample-post-1',
    title: 'Hello World – Your First Blog Post',
    slug: { current: 'hello-world' },
    body: [],
    publishedAt: '2025-01-01',
  },
  {
    _id: 'sample-post-2',
    title: 'Learning React and Sanity',
    slug: { current: 'learning-react-sanity' },
    body: [],
    publishedAt: '2025-02-01',
  },
]

const sampleAuthor = {
  _id: 'sample-author',
  name: 'Mohammed Yasin',
  bio: 'I am a beginner front‑end developer excited to learn React and Sanity! Edit this bio from the Admin page.',
  imageUrl: 'https://via.placeholder.com/150',
}

const sampleCategories = []

export async function fetchProjects() {
  if (!config.projectId) {
    return sampleProjects
  }
  const query = '*[_type == "project"]{_id, title, description, "imageUrl": image.asset->url, tags}'
  return await sanityClient.fetch(query)
}

export async function fetchBlogPosts() {
  if (!config.projectId) {
    return sampleBlogPosts
  }
  const query = '*[_type == "post"]{_id, title, slug, body, publishedAt}'
  return await sanityClient.fetch(query)
}

export async function fetchAuthor() {
  // Convert Portable Text -> plain text using pt::text
  const query = `*[_type == "author"][0]{
    _id,
    name,
    "bioPlain": coalesce(pt::text(bio), ""),
    "imageUrl": image.asset->url
  }`

  return await sanityClient.fetch(query)
}

export async function createCategory(title) {
  if (!config.projectId) {
    const newCategory = {
      _id: `sample-category-${Date.now()}`,
      title,
    }
    sampleCategories.push(newCategory)
    return newCategory
  }
  const doc = {
    _type: 'category',
    title,
  }
  return await sanityClient.create(doc)
}

export async function updateAuthorBio(authorId, newBio) {
  if (!config.projectId) {
    sampleAuthor.bio = newBio
    return { ...sampleAuthor }
  }
  return await sanityClient.patch(authorId).set({ bio: newBio }).commit()
}