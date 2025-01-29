import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import CircularProgressWithLabel from './CircularProgressWithLabel'; // Adjust the import path as needed

function Recipe() {
  const params = useParams();
  const [details, setDetails] = useState({});
  const [activeTab, setActiveTab] = useState("instructions");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchDetails = async () => {
      setLoading(true);
      try {
        const api = await fetch(
          `https://api.spoonacular.com/recipes/${params.name}/information?apiKey=${process.env.REACT_APP_API_KEY}`
        );
        const data = await api.json();
        setDetails(data);
        console.log(data);
      } catch (error) {
        console.error("Error fetching recipe details:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchDetails();
  }, [params.name]);

  if (loading) {
    return (
      <LoaderWrapper>
        <CircularProgressWithLabel value={100} />
      </LoaderWrapper>
    );
  }

  return (
    <DetailWrapper>
      <div>
        <h2>{details.title}</h2>
        <img src={details.image} alt={details.title} />
      </div>
      <Info>
        <Button
          className={activeTab === "instructions" ? "active" : ""}
          onClick={() => setActiveTab("instructions")}
        >
          Instructions
        </Button>
        <Button
          className={activeTab === "ingredients" ? "active" : ""}
          onClick={() => setActiveTab("ingredients")}
        >
          Ingredients
        </Button>
      </Info>
      <Content>
        {activeTab === "instructions" && details.summary && details.instructions && (
          <InstructionsBox>
            <h3 dangerouslySetInnerHTML={{ __html: details.summary }}></h3>
            <h3 dangerouslySetInnerHTML={{ __html: details.instructions }}></h3>
          </InstructionsBox>
        )}

        {activeTab === "ingredients" && details.extendedIngredients && (
          <IngredientsBox>
            <ol>
              {details.extendedIngredients.map((ingredient) => (
                <li key={ingredient.id}>{ingredient.original}</li>
              ))}
            </ol>
          </IngredientsBox>
        )}
      </Content>
    </DetailWrapper>
  );
}

const LoaderWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const DetailWrapper = styled.div`
  margin-top: 5rem;
  margin-bottom: 5rem;
  display: flex;
  flex-direction: column;
  align-items: center;

  .active {
    background: linear-gradient(35deg, #494949, #313131);
    color: white;
  }

  h2 {
    margin-bottom: 2rem;
    text-align: center;
    color: #333;
  }

  img {
    border-radius: 1rem;
    max-width: 60%;
    height: auto;
    object-fit: cover;
    display: block;
    margin: 0 auto;
  }
`;

const Info = styled.div`
  margin-top: 2rem;
  display: flex;
  justify-content: center;
  gap: 1rem;
`;

const Button = styled.button`
  padding: 1rem 2rem;
  border: 2px solid #313131;
  background: transparent;
  color: #313131;
  font-weight: 600;
  cursor: pointer;
  border-radius: 3rem;
  transition: background 0.3s ease;
  height: 3rem;

  &:hover {
    background: #494949;
    color: white;
  }
`;

const Content = styled.div`
  display: flex;
  justify-content: center;
  gap: 2rem;
  margin-top: 2rem;
  width: 80%;
`;

const InstructionsBox = styled.div`
  padding: 2rem;
  border: 1px solid #ddd;
  border-radius: 1rem;
  background-color: #f9f9f9;
  width: 50%;
  max-height: 400px;
  overflow-y: auto;
  text-align: left;

  h3 {
    margin-bottom: 1rem;
    color: #333;
  }
`;

const IngredientsBox = styled.div`
  padding: 2rem;
  border: 1px solid #ddd;
  border-radius: 1rem;
  background-color: #f9f9f9;
  width: 50%;
  max-height: 400px;
  overflow-y: auto;
  text-align: left;

  ol {
    padding: 0;

    li {
      font-size: 1.2rem;
      line-height: 2.5rem;
      color: #333;
    }
  }
`;

export default Recipe;