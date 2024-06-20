
import './App.css';
import { Container } from 'react-bootstrap';
import { MenuPage } from './common/MenuPage';
import { BoxContext } from './context/BoxContext';
import Box from './common/Box';
import { useState } from 'react';
function App() {
  const [box, setBox] = useState({
    show:false,
    message:'',
    action: null
  });

  return (
    <BoxContext.Provider value={{box,setBox}}>
      <Container className="App">
        <h1>리액트</h1>
        <MenuPage/>
      </Container>
      {box.show && <Box box={box} setBox={setBox}/>} 
    </BoxContext.Provider>
  );
}

export default App;
