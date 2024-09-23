import logo from './logo.svg';
import './App.css';
import ListPage from './components/users/ListPage';
import ReadPage from './components/users/ReadPage';
import TopPage from './components/TopPage';
import BottomPage from './components/BottomPage';
import HomePage from './components/HomePage';
import { Container } from 'react-bootstrap';
import MenuPage from './components/MenuPage';
import { CountContext } from './components/CountContext';
import axios from 'axios';
import { useEffect, useState } from 'react';

function App() {
  /*
  const [count, setCount] = useState(0);
  const getUserCount = async() => {
    const res=await axios.get('/users/count');
    console.log(res.data.count);
    setCount(res.data.count);
  }
  

  useEffect(()=>{
    getUserCount();
  }, []);
  */
  const [count,setCount] = useState(0);
  const callAPICount=async()=>{
    const res= await axios.get(`/cart/list?uid=${sessionStorage.getItem('uid')}`);
    setCount(res.data.length);
  }

  useEffect(()=>{
    callAPICount();
  },[])

  return (
    <CountContext.Provider value={{count ,setCount, callAPICount}} >
    <Container className="App">
      <MenuPage/>
      <BottomPage/>
    </Container>
    </CountContext.Provider>
  );
}

export default App;
