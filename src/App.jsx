import React from 'react'
import { RouterProvider } from 'react-router-dom'
import browserRouter from './router/browser-router'

export default function App() {
  return (
    <RouterProvider router={browserRouter} />
  )
}
