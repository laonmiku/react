import React from 'react'
import { Route, Routes } from 'react-router-dom'
import ListPage from '../components/students/ListPage'
import InsertPage from '../components/students/InsertPage'
import ReadPage from '../components/students/ReadPage'
import UpdatePage from '../components/students/UpdatePage'

const StudentsRouter = () => {
  return (
    <Routes>
        <Route path="" element={<ListPage/>} />
        <Route path="insert" element={<InsertPage/>} />
        <Route path="read/:scode" element={<ReadPage/>} />
        <Route path="update/:scode" element={<UpdatePage/>} />
    </Routes>
  )
}

export default StudentsRouter