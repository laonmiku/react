import React from 'react'
import { Route, Routes } from 'react-router-dom'
import StudentsRouter from './StudentsRouter'
import HomePage from '../common/HomePage'
import CourseRouter from './CourseRouter'

const RouterPage = () => {
  return (
    <Routes>
        <Route path='/' element={<HomePage/>}/>
        <Route path="/stu/*" element={<StudentsRouter/>}/>
        <Route path="/cou/*" element={<CourseRouter/>}/>
    </Routes>
  )
}

export default RouterPage