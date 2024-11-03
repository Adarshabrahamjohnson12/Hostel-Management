import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import HomePage from './pages/HomePage'
import AdminDashboard from './components/AdminDashboard'
import { SnackbarProvider } from 'notistack'
import StudentDashboard from './components/StudentDashboard'
import NoPage from './pages/NoPage'
import StudentAdd from './components/StudentAdd'
const App = () => {
  return (
    <BrowserRouter>
      <SnackbarProvider>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path='/admin' element={<AdminDashboard />} />
          <Route path='/student/:id' element={<StudentDashboard />} />
          <Route path="*" element={<NoPage/>} />
          <Route path='/admin/students' element={<StudentAdd/>}/>
        </Routes>
      </SnackbarProvider>
    </BrowserRouter>
  )
}

export default App