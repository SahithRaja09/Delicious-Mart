import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import CircularProgress from '@mui/material/CircularProgress';

function Cuisine() {
  const [cuisine, setCuisine] = useState([]);
  const [loading, setLoading] = useState(true);
  const params = useParams();

  useEffect(() => {
    getCuisine(params.type);
    console.log(params.type);
  }, [params.type]);

  const getCuisine = async (name) => {
    setLoading(true);
    try {
      const api = await fetch(
        `https://api.spoonacular.com/recipes/complexSearch?apiKey=${process.env.REACT_APP_API_KEY}&cuisine=${name}&number=9`
      );
      const data = await api.json();
      setCuisine(data.results);
      console.log(data.results);
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
    <>
      <RecipeGrid
        animate={{ opacity: 1 }}
        initial={{ opacity: 0 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
      >
        {cuisine.map((recipe) => (
          <Card key={recipe.id}>
            <Link to={`/recipe/${recipe.id}`}>
              <img src={recipe.image} alt={recipe.title} />
              <h4>{recipe.title}</h4>
            </Link>
          </Card>
        ))}
      </RecipeGrid>
    </>
  );
}

const LoaderWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const RecipeGrid = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(12rem, 1fr));
  grid-gap: 2rem;

  @media (max-width: 768px) {
    grid-template-columns: repeat(auto-fit, minmax(10rem, 1fr));
    grid-gap: 1.4rem;
  }
`;

const Card = styled(motion.div)`
  img {
    border-radius: 1.5rem;
    width: 100%;
    height: 10rem;
    object-fit: cover;
    transition: transform 0.3s ease-in-out;
  }

  img:hover {
    transform: scale(1.1);
  }

  h4 {
    text-align: center;
    margin-top: 0.5rem;
    font-size: 1rem;
    color: #333;
  }

  a {
    text-decoration: none;
    color: inherit;
  }
`;

export default Cuisine;