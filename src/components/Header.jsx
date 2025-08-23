import React from 'react'
import { NavLink } from 'react-router-dom'

export default function Header() {
  // Function that returns style based on whether link is active
  const linkStyle = ({ isActive }) => ({
    marginRight: '1rem',
    textDecoration: 'none',
    color: isActive ? '#2563eb' : '#374151',
  })
  return (
    <header>
      <nav>
        <NavLink to="/" style={linkStyle} end>Home</NavLink>
        <NavLink to="/about" style={linkStyle}>About</NavLink>
        <NavLink to="/projects" style={linkStyle}>Projects</NavLink>
        <NavLink to="/blog" style={linkStyle}>Blog</NavLink>
        <NavLink to="/admin" style={linkStyle}>Admin</NavLink>
      </nav>
    </header>
  )
}