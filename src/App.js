import React from 'react';
import Pages from './pages/Pages';
import Category from './components/Category'
import { BrowserRouter, Link } from 'react-router-dom';
import Searcj from './components/Searcj';
import { GiFoodTruck } from "react-icons/gi";
import styled from 'styled-components';
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Nav>
          <GiFoodTruck />
          <Logo to="/">DeliciousMart</Logo>
          </Nav>
        <Searcj />
        <Category />
        <Pages />
        
      </BrowserRouter>
    </div>
  );
}
const Logo= styled(Link)`
text-decoration: none;
color: #000;
font-size: 1.6rem;
font-weight: 450;
font-family: 'Lobster Two', cursive;
`;
const Nav=styled.div`
padding:1.5rem 0.8rem;
display: flex;
justify-content: flex-start;
align-items: center;

svg{
  font-size: 2rem;
  margin-right: 1rem;
}
`
export default App;
