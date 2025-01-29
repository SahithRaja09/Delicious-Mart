import React from 'react'
import { FaPizzaSlice,FaHamburger } from 'react-icons/fa'
import { GiNoodles, GiChopsticks } from 'react-icons/gi'
import styled from 'styled-components';
import { Link } from 'react-router-dom';
function Category() {
  return (
    <List>
        <SLink to={'/cuisine/Italian'}>
        <div>
        <FaHamburger />
        <h4>Italian</h4>
        </div>
        </SLink>
             
             <SLink to= {'/cuisine/American'}>
            <div>
            <FaPizzaSlice />
            <h4>American</h4>
            </div>
            </SLink>
            
            <SLink to= {'/cuisine/Chinese'}>
            <div>
            <GiNoodles />
            <h4>Chinese</h4>
            </div>
            </SLink>
              
            <SLink to= {'/cuisine/Japanese'}>
            <div>
            <GiChopsticks />
            <h4>Japanese</h4>
            </div>
            </SLink>
    </List>
  )
}

    const List = styled.div`
    display: flex;
    justify-content: center;

    align-items: center;
    margin: 1.2rem 1rem;

  
    div {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 0.1rem;
  
      svg {
        font-size: 1.3rem;
        transition: transform 0.2s ease-in-out;
      }
  
      &:hover svg {
        transform: scale(1.2);

      }
    }
  `;
  
  const SLink = styled(Link)`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    margin-right: 1.4rem;
    text-decoration: none;
    background: linear-gradient(45deg, #494949, #313131);
    width: 5.9rem;
    height: 5.7rem;
    cursor: pointer;
    transform: scale(0.56);
    transition: transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out;
  
    &:hover {
      transform: scale(0.7);
      box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
    }
  
    h4 {
      color: white;
      font-size: 0.8rem;
      margin-top: 0.5rem;
    }
  
    svg {
      color: white;
      font-size: 1.5rem;
    }

    &:active {
      background: linear-gradient(to right, #f27121,#e94057);
      
    }
  `;
  

export default Category
