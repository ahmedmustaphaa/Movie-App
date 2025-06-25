import React from 'react';
import { assets } from '../assets/assets';
import { ArrowRight, Calendar1Icon, ClockIcon } from 'lucide-react';
import { useNavigate } from 'react-router';
import { motion } from 'framer-motion';

function Herosection() {
  const nav = useNavigate();

  return (
    <motion.div
      className='flex flex-col items-start text-left justify-center gap-4 px-6 md:px-16 lg:px-36 bg-[url("/backgroundImage.png")] bg-cover bg-center h-screen text-white relative'
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1.2, ease: 'easeOut' }}
    >
      {/* شعاع خلفي متحرك بسيط */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-[#ff000020] via-[#00000088] to-[#ff990030] blur-xl z-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2 }}
      />

      <motion.img
        src={assets.marvelLogo}
        className='max-h-11 lg:h-11 mt-20 z-10'
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2, duration: 1 }}
      />

      <motion.h1
        className='text-5xl md:text-[70px] md:leading-[80px] font-semibold z-10'
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 1 }}
      >
        Guardians <br /> of the Galaxy
      </motion.h1>

      <motion.div
        className='flex items-start gap-2 text-gray-400 text-base z-10'
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.6, duration: 0.8 }}
      >
        <span>Action || Adventure || Sci-Fi</span>

        <div className='flex items-center gap-2'>
          <Calendar1Icon className='w-4 h-4' />
          <span>2018</span>
        </div>

        <div className='flex items-center gap-2'>
          <ClockIcon className='w-4 h-4' />
          <span>2h 8m</span>
        </div>
      </motion.div>

      <motion.p
        className='w-[50%] text-gray-300 z-10'
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8, duration: 1 }}
      >
        Give our universal encrypt/decrypt tool a try! Encrypt or decrypt any string using various algorithm with just one mouse click. Popularity. AES (Advanced Encryption Standard) is the most popular
      </motion.p>

      <motion.button
        className='flex items-center gap-3 px-6 py-3 text-sm bg-primary hover:bg-primary-dull transition rounded-full font-medium cursor-pointer z-10'
        onClick={() => nav('/movie')}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.7 }}
      >
        Explore Movie
        <ArrowRight className='w-5 h-5' />
      </motion.button>
    </motion.div>
  );
}

export default Herosection;
