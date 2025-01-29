import Veggie from '../components/Veggie'
import Popular from '../components/Popular'
import React from 'react'
import {motion} from 'framer-motion'
const Home = () => {
  return (
    
      <motion.div
      
      animte={{opactiy:1}}
      inital={{opactiy:0}}
      exit={{opactiy:0}}
      transition={{duration:0.5}}

      >
    <Veggie />
    <Popular />
    </motion.div>
  )
}

export default Home
