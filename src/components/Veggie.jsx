import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/react-splide/css';
import { Link } from 'react-router-dom';
import CircularProgress from '@mui/material/CircularProgress';

function Veggie() {
  const [veggies, setVeggies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getVeggies();
  }, []);

  const getVeggies = async () => {
    setLoading(true);
    try {
      const storage = localStorage.getItem('veggies');
      if (storage) {
        setVeggies(JSON.parse(storage));
      } else {
        const api = await fetch(
          `https://api.spoonacular.com/recipes/random?apiKey=${process.env.REACT_APP_API_KEY}&number=10&tags=vegetarian`
        );
        const data = await api.json();
        localStorage.setItem('veggies', JSON.stringify(data.recipes));
        setVeggies(data.recipes);
        console.log(data.recipes);
      }
    } catch (error) {
      console.error('Error fetching the API:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <LoaderWrapper>
        <CircularProgress />
      </LoaderWrapper>
    );
  }

  return (
    <Wrapper>
      <h3>Popular Veggies</h3>
      <Splide
        options={{
          perPage: 3,
          arrows: false,
          pagination: false,
          drag: 'free',
          gap: '2rem',
          autoplay: true,
          interval: 2500,
          speed: 500,
          type: 'loop',
          breakpoints: {
            1024: { perPage: 3 },
            768: { perPage: 2 },
            480: { perPage: 1 },
          },
        }}
      >
        {veggies.map((recipe) => (
          <SplideSlide key={recipe.id}>
            <Card>
              <Link to={"/recipe/" + recipe.id}>
                <p>{recipe.title}</p>
                <img src={recipe.image} alt={recipe.title} />
                <Gradient />
              </Link>
            </Card>
          </SplideSlide>
        ))}
      </Splide>
    </Wrapper>
  );
}

const LoaderWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

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

export default Veggie;