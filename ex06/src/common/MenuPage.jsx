import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import RouterPage from '../routers/RouterPage'
import HeaderPage from './HeaderPage'
import { BoxContext } from './BoxContext'

const MenuPage = () => {
  const {user,setUser} = useContext(BoxContext);
  const onClickLogout =(e)=>{
    e.preventDefault();
    if(!window.confirm("정말로 로그아웃 하실래요?")) return;
    setUser({
      uid:''
    });
    sessionStorage.clear();
    window.location.href='/';
  }
  return (
    <>
    <HeaderPage/>
      <div className='mt-5'>
      <Link to='/' className='me-3' style={{float:'left'}}>Home</Link>
   
        
   {sessionStorage.getItem("uid") ?
     <>
       <Link to='/goods/search' className='me-3 'style={{float:'left'}} >상품검색</Link>
       <Link to='/goods/list' className='me-3' style={{float:'left'}}>상품목록</Link>
       <Link to='#' className='me-3' style={{float:'right'}}>{sessionStorage.getItem("uid")}님</Link>
       <Link  onClick={onClickLogout} to='#' className='me-3' style={{float:'right'}}>로그아웃</Link>
     </>
        :
          <Link to='/users/login' className='me-3' style={{float:'right'}}>로그인</Link>
        }
        <br/>
        <hr/>
      </div>
      <RouterPage/>
    </>
  )
}

export default MenuPage