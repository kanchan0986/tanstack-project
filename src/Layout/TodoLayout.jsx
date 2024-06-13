import React from 'react'
import { Outlet } from 'react-router-dom'
import TodoNavigation from '../pages/Navigation/TodoNavigation'

export default function TodoLayout() {
  return (
    <>
        <TodoNavigation/>
        <Outlet/>
    </>
  )
}
