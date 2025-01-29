import React from 'react';
import Home from './Home';
import Cuisine from './Cuisine';
import { Routes, Route, useLocation } from 'react-router-dom';
import Searched from './Searched';
import Recipe from './Recipe';
import { AnimatePresence } from 'framer-motion';
function Pages() {
  const location=useLocation();
  return (
    <AnimatePresence mode="waitbeforeexit">
    <Routes location={location} key={location.pathname}>
      <Route path="/" element={<Home />} />
      {/* Correct path for dynamic cuisine route */}
      <Route path="/cuisine/:type" element={<Cuisine />} />
      <Route path="/search/:query" element={<Searched />} />
      <Route path="/recipe/:name" element={<Recipe />} />
    </Routes>
    </AnimatePresence>
  );
};

export default Pages;
