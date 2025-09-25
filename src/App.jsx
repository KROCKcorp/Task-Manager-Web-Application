import {BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom'
import TaskListPage from './pages/TaskListPage'
import TaskFormPage from './pages/TaskFormPage'
import TaskDetailsPage from './pages/TaskDetailsPage'
import MainLayout from './layouts/MainLayout'

export default function App() {
  

  return (
    <Router>
      <Routes>
        <Route
          element={
            <MainLayout/>
          }>
          <Route path='/' element={<TaskListPage />} />
          <Route path='/tasks/new' element={<TaskFormPage mode='create' />} />
          <Route path='/tasks/:id' element={<TaskDetailsPage />} />
          <Route path='/tasks/:id/edit' element={<TaskFormPage mode='edit' />} />
        </Route>
        <Route path='*' element={<Navigate to='/' replace />} />
      </Routes>
    </Router>
  )
}
