import React from 'react'
import { NavLink } from 'react-router-dom'

export default function ProjectNavigation() {
  return (
    <nav className='subNav-menu'>
        <NavLink to='.' className={({isActive}) => isActive ? 'sub-active sub-menu' : 'sub-menu'} end>All Projects</NavLink>
        <NavLink to='delivered' className={({isActive}) => isActive ? 'sub-active sub-menu' : 'sub-menu'}>Delivered</NavLink>
        <NavLink to='undelivered' className={({isActive}) => isActive ? 'sub-active sub-menu' : 'sub-menu'}>Undelivered</NavLink>
    </nav>
  )
}
