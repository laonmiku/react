
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import RouterPage from './RouterPage';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useEffect, useState } from 'react';

const MenuPage = () => {
  const navi = useNavigate()
  const uid=sessionStorage.getItem('uid');
  const [user,setUser] = useState('');
  
  const onClickLogout =(e)=>{
    e.preventDefault();
    if(window.confirm("정말 로그아웃 하실래요")){
      sessionStorage.clear();
      navi("/");
    }
  }
  const callAPI=async()=>{
    const url=`/users/read/${uid}`;
    const res=await axios.get(url);
    const {uname} = res.data;
    //console.log(uname);
    setUser(res.data);
    console.log(user);
  }
  useEffect(()=>{
    if(uid) callAPI();
  },[uid]) 

    return (
      <>
        <Navbar expand="lg" className="bg-dark"  data-bs-theme='dark'>
          <Container fluid>
            <Navbar.Brand href="/">LOGO</Navbar.Brand>
            <Navbar.Toggle aria-controls="navbarScroll" />
            <Navbar.Collapse id="navbarScroll">
              <Nav
                className="me-auto my-2 my-lg-0"
                style={{ maxHeight: '100px' }}
                navbarScroll
              >
                <Nav.Link href="/">도서검색</Nav.Link>
                <Nav.Link href="/">도서목록</Nav.Link>
               
              </Nav>
              {uid ?
                <>
                  <Nav>
                    <Nav.Link href="/users/mypage" className='active'>{uid}({user.uname})님</Nav.Link>
                  </Nav>
                  <Nav>
                    <Nav.Link href="/" onClick={onClickLogout}>로그아웃</Nav.Link>
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
        <RouterPage/>
    </>
    );
    
}

export default MenuPage