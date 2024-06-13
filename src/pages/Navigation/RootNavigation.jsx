import React from 'react'
import { NavLink } from 'react-router-dom'

export default function RootNavigation() {
  return (
    <nav className='nav-menu'>
        <NavLink to='/' className={({isActive}) => isActive ? 'active menu' : 'menu'}>Homepage</NavLink>
        <NavLink to='todo' className={({isActive}) => isActive ? 'active menu' : 'menu'}>Todos</NavLink>
        <NavLink to='project' className={({isActive}) => isActive ? 'active menu' : 'menu'}>Projects</NavLink>
        <NavLink to='product' className={({isActive}) => isActive ? 'active menu' : 'menu'}>Products</NavLink>
    </nav>
  )
}
