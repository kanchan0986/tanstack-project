import React from 'react'
import { Outlet } from 'react-router-dom'
import RootNavigation from '../pages/Navigation/RootNavigation'

export default function RootLayout() {
  return (
    <>
        <RootNavigation/>
        <Outlet/>
    </>
  )
}
