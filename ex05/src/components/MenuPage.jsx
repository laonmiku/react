import React from 'react'
import { Link } from 'react-router-dom'
import { Routes,Route } from 'react-router-dom';
import BBSRouter from './router/BBSRouter';
import UserRouter from './router/UserRouter';
import HomePage from './HomePage';
import { Badge } from 'react-bootstrap';

const MenuPage = () => {
  const uid = sessionStorage.getItem('uid');
  const uname = sessionStorage.getItem('uname');
  const onLogout =(e)=>{
    e.preventDefault();
    if(!window.confirm("로그아웃하실래요?")) return;
    sessionStorage.clear();
    window.location.href="/";
  }
  return (
    <div>
      <Link to="/" className='menubar'>Home |</Link> 
      <Link to="/bbs/list"  className='menubar'>게시판 |</Link>
      {uid ?
        <>
          <Link to="/users/read"  className='menubar'><Badge pill  bg="info" >{uid}({uname})님</Badge></Link>
          <Link to="#" onClick={onLogout}  className='menubar'>로그아웃 |</Link>
        </>
      :
        <>
          <Link to="/users/login"  className='menubar'>로그인 |</Link>
        </>
      }
      
      <hr/>
      <Routes>
        <Route path='/' element={<HomePage/>}/>
        <Route path='/bbs/*' element={<BBSRouter/>}/>
        <Route path='/users/*' element={<UserRouter/>}/>
      </Routes>
    </div>
  )
}

export default MenuPage