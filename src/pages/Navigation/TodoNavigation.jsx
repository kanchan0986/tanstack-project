import React from 'react'
import { NavLink } from 'react-router-dom'

export default function TodoNavigation() {
  return (
    <nav className='subNav-menu'>
        <NavLink to='.' className={({isActive}) => isActive ? 'sub-active sub-menu' : 'sub-menu'} end>All Todos</NavLink>
        <NavLink to='read' className={({isActive}) => isActive ? 'sub-active sub-menu' : 'sub-menu'}>Read Todos</NavLink>
        <NavLink to='unread' className={({isActive}) => isActive ? 'sub-active sub-menu' : 'sub-menu'}>Unread Todos</NavLink>
    </nav>
  )
}
