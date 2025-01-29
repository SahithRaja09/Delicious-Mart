import React, { useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
function Searcj() {
  const [input, setInput] = useState("");
  const navigate = useNavigate();

  return (
    <FormWrapper>
      <FormStyle
        onSubmit={(e) => {
          e.preventDefault();
          navigate(`/search/${input}`);
        }}
      >
        <div>
          <FaSearch />
          <input
            onChange={(e) => setInput(e.target.value)}
            type="text"
            placeholder="Search for recipes..."
            value={input}
          />
        </div>
      </FormStyle>
    </FormWrapper>
  );
}

const FormWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin-top: 1rem;
`;

const FormStyle = styled.form`
  width: 100%;
  max-width: 600px;

  div {
    position: relative;
    width: 100%;
  }

  input {
    width: 100%;
    padding: 1rem 1rem 1rem 3rem; /* Padding adjusted for space between icon and text */
    font-size: 1.2rem;
    border: none;
    border-radius: 0.5rem;
    background: linear-gradient(35deg, #494949, #313131);
    color: white;
    outline: none;
  }

  svg {
    position: absolute;
    top: 50%;
    left: 1rem;
    transform: translateY(-50%);
    color: white;
    font-size: 1.2rem; /* Icon size */
  }
`;

export default Searcj;
