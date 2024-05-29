import logo from './logo.svg';
import './App.css';
import ListPage from './components/users/ListPage';
import ReadPage from './components/users/ReadPage';
import TopPage from './components/TopPage';
import BottomPage from './components/BottomPage';
import HomePage from './components/HomePage';
import { Container } from 'react-bootstrap';
import MenuPage from './components/MenuPage';

function App() {
  return (
    <Container className="App">
      <TopPage/>
      <MenuPage/>
      <BottomPage/>
    </Container>
  );
}

export default App;
