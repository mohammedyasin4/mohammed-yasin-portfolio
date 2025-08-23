import React from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import './index.css'

// Grab the root div from index.html
const container = document.getElementById('root')
// Create a React root. React 18+ uses createRoot instead of ReactDOM.render
const root = createRoot(container)

// Render the App component wrapped in BrowserRouter
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
)