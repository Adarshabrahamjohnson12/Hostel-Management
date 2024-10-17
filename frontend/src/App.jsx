import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import HomePage from './pages/HomePage'
import AdminDashboard from './components/AdminDashboard'
import { SnackbarProvider } from 'notistack'

const App = () => {
  return (
    <BrowserRouter>
      <SnackbarProvider>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path='/admin' element={<AdminDashboard />} />

        </Routes>
      </SnackbarProvider>
    </BrowserRouter>
  )
}

export default App