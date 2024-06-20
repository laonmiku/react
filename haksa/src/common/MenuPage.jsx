import React from 'react'
import { Link } from 'react-router-dom'
import RouterPage from '../router/RouterPage'

export const MenuPage = () => {
  return (
    <>
    <div>
        <Link to="/" >Home</Link> <br/>
        <Link to="/stu" >학생관리</Link><br/>
        <Link to="/cou" >강좌관리</Link><br/>
        <hr/>
    </div>
      <RouterPage/>
    </>
  )
}
