import React from 'react'
import { NavLink } from 'react-router-dom'

export default function TodoNavigation() {
  return (
    <nav className='subNav-menu'>
        <NavLink to='.' className={({isActive}) => isActive ? 'sub-active sub-menu' : 'sub-menu'} end>All Todos</NavLink>
        <NavLink to='special' className={({isActive}) => isActive ? 'sub-active sub-menu' : 'sub-menu'}>Special Todos</NavLink>
    </nav>
  )
}
