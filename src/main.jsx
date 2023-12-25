import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router-dom'
import Router from './Router/Router.jsx'
import AuthProvider from './Provider/AuthProvider.jsx'

import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'



const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
    <QueryClientProvider client={queryClient}>
    <DndProvider backend={HTML5Backend}>
    <div className='max-w-6xl mx-auto'>
    <RouterProvider router={Router}></RouterProvider>
    </div>
    </DndProvider>
    </QueryClientProvider>
    </AuthProvider>
  </React.StrictMode>,
)
