import React from 'react'
import { motion } from 'framer-motion'
 export default  function About() {
  return (
    <motion.div 
    initial={{ opacity: 0, scale: 0.5 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.5 }} 
    
    className='md:w-3/6 w-4/6 flex flex-col items-center mx-auto shadow-md md:py-6 md:mt-4'>
      <h1 className='title-font font-bold text-3xl text-[#08415c] Hind py-5 px-5'>About Us</h1>
      <p className='Montserrat px-5'>We are a team of software developers and teachers who have had it with the traditional grading system. teachers are expected to take time of they're valuable days off too grade dozens sometimes event hundreds of papers.
        We saw a great opportunity to help teachers with the emerging technology of AI, which is great at tasks relating to lanuage and grammar. Our app allows teachers to utilize the power of openAI's chatGPT to grade papaers mmore effeciently than ever before!
      </p>
    </motion.div>
  )
}

