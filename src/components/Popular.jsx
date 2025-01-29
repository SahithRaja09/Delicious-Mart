import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import '@splidejs/splide/dist/css/splide.min.css';
import { Splide, SplideSlide } from '@splidejs/react-splide';
import { Link } from 'react-router-dom';
function Popular() {
  const [popular, setPopular] = useState([]);

  useEffect(() => {
    getPopular();
  }, []);

  const getPopular = async () => {
    try {
      const storage=localStorage.getItem('popular');
      if(storage)
      {
        setPopular(JSON.parse(storage));
      }
      else
      {
      const api = await fetch(
        `https://api.spoonacular.com/recipes/random?apiKey=${process.env.REACT_APP_API_KEY}&number=10`
      );
      const data = await api.json();
      localStorage.setItem('popular',JSON.stringify(data.recipes));
      setPopular(data.recipes);
      console.log(data.recipes);
      }
    }
    catch (error) {
      console.error('Error fetching the API:', error);
    }
  };

  return (
    <Wrapper>
      <h3>Popular Picks</h3>
      <Splide
        options={{
          perPage: 4,
          arrows: false, // Disable navigation arrows
          pagination: false, // Disable pagination dots
          drag: 'free', // Allow free scrolling
          gap: '2rem', // Space between slides
          autoplay: true, // Enable auto-play
          interval: 2500, // Delay between slides
          speed: 500, // Transition speed
          type: 'loop', // Enable smooth looping
          breakpoints: {
            1024: { perPage: 4 }, // Tablets
            768: { perPage: 2 }, // Small tablets
            480: { perPage: 1 }, // Phones
          },
        }}
      >
        {popular.map((recipe) => (
          <SplideSlide key={recipe.id}>
            <Card>
              <Link to={"/recipe/"+recipe.id}>
              <p>{recipe.title}</p>
              <img src={recipe.image} alt={recipe.title}/>
              
              <Gradient />
              </Link>
            </Card>
          </SplideSlide>
        ))}
      </Splide>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  margin: 4rem 0;
  overflow: visible;

  h3 {
    font-size: 1.5rem;
    font-weight: bold;
    text-align: center;
    margin-bottom: 2rem;
  }
`;

const Card = styled.div`
  position: relative;
  min-height: 15rem;
  border-radius: 1.5rem;
  overflow: hidden;
  transition: transform 0.3s ease-in-out;

  &:hover {
    transform: scale(1.05);
  }

  img {
    border-radius: 1.5rem;
    position: absolute;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  p {
    position: absolute;
    z-index: 10;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    color: white;
    font-weight: bold;
    font-size: 1rem;
    text-align: center;
    text-shadow: 0 2px 5px rgba(0, 0, 0, 0.8);
  }
`;

const Gradient = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  background: linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.5) 100%);
  z-index: 3;
  border-radius: 1.5rem;
`;


export default Popular;
