import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import RouterPage from './RouterPage';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import { Badge } from 'react-bootstrap';
import { FaCartArrowDown } from "react-icons/fa";
import { CountContext } from './CountContext';
import AdminRouter from './admin/AdminRouter';
import TopPage from './TopPage';
//<FaCartArrowDown />
//import {CountConText} from './CountContext';

const MenuPage = () => {
  //const [count, setCount] = useState(0); 앱에서 프로바이더
  const {count, setCount} = useContext(CountContext);
 
  const navi = useNavigate();
  const uid = sessionStorage.getItem("uid");
  const [user, setUser] = useState('');

  const callAPI = async() => {
    const url=`/users/read/${uid}`;
    const res=await axios.get(url);
    setUser(res.data);
  }

  useEffect(()=>{
    if(uid) callAPI();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [uid]);

  const onClickLogout = (e) => {
    e.preventDefault();
    if(window.confirm("정말로 로그아웃하실래요?")){
      sessionStorage.clear();
      navi("/");
    }
  }

  const getCartCount = async() => {
    const res=await axios.get(`/cart/list?uid=${uid}`);
    //console.log('...........',res.data.length);
    setCount(res.data.length);
  };
  
  useEffect(()=>{
    getCartCount();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[]) 

  return (
    <>
      
      <Navbar expand="lg" className="bg-primary" data-bs-theme="dark">
        <Container>
          <Navbar.Brand href="/">HOME</Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
              {uid==='admin' &&
                <>
                  <Nav.Link href="/books/list">도서목록</Nav.Link>
                  <Nav.Link href="/books/search">도서검색</Nav.Link>
                  <Nav.Link href="/admin/orders">주문관리</Nav.Link>
                </> 
              }
              {uid && uid !=='admin' &&
                <Nav.Link href="/orders/list">주문목록</Nav.Link>
              }
              
            </Nav>
            {uid ? 
              <>
                <Nav>
                <Nav.Link  className='active' href="/orders/cart">
                  {count ===0 ?
                    <FaCartArrowDown  style={{fontSize:'25px'}}/>
                  :
                  <>
                  <FaCartArrowDown style={{fontSize:'25px',position:'absolute'}}/>
                  <Badge bg="danger" style={{position:'relative', top:'-10px',left:'-10px'}}><span>{count}</span></Badge>
                  </>
                }
                 
                </Nav.Link>
                </Nav>
                <Nav>
                  <Nav.Link href="/users/login" className='me-4 active'>
                      
                  </Nav.Link>
                </Nav>
                <Nav>
                  <Nav.Link href="/users/mypage" className='active me-3'>
                    <span className='ms-1'>{user.uname}님</span>
                  </Nav.Link>
                </Nav>
                <Nav>
                  <Nav.Link href="#" onClick={onClickLogout}>로그아웃</Nav.Link>
                </Nav>
              </>
              :
              <Nav>
                <Nav.Link href="/users/login">로그인</Nav.Link>
              </Nav>
            }
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <TopPage/>
      <RouterPage/>
      <AdminRouter/>
    </>
  );
}

export default MenuPage