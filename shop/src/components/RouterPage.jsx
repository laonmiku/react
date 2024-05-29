import React from 'react'
import { Route, Routes } from 'react-router-dom'
import LoginPage from './users/LoginPage'
import ReadPage from './users/ReadPage'
import SearchPage from './books/SearchPage'
import ListPage from './books/ListPage'
//메뉴바에 빈태그로묶어서 하단에 넣어줌,,

const RouterPage = () => {
  return (
    <Routes>
        <Route path='/users/login' element={<LoginPage/>}/>
        <Route path='/users/mypage' element={<ReadPage/>}/>
        <Route path='/books/search' element={<SearchPage/>}/>
        <Route path='/books/list' element={<ListPage/>}/>
    </Routes>

  )
}

export default RouterPage