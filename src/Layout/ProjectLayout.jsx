import React from 'react'
import { Outlet } from 'react-router-dom'
import ProjectNavigation from '../pages/Navigation/ProjectNavigation'

export default function ProjectLayout() {
  return (
    <>
        <ProjectNavigation/>
        <Outlet/>
    </>
  )
}
