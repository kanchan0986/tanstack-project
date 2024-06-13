import React from 'react'
import { NavLink } from 'react-router-dom'

export default function ProjectNavigation() {
  return (
    <nav className='subNav-menu'>
        <NavLink to='.' className={({isActive}) => isActive ? 'sub-active sub-menu' : 'sub-menu'} end>All Projects</NavLink>
        <NavLink to='special' className={({isActive}) => isActive ? 'sub-active sub-menu' : 'sub-menu'}>Special Projects</NavLink>
    </nav>
  )
}
