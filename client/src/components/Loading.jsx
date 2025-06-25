// components/Loading.jsx
import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';

function Loading() {
  const navigate = useNavigate();

  const {nextUrl}=useParams()

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/'+nextUrl); // ✅ غيّر دا للمسار اللي عايز تروحه
    }, 4000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="flex justify-center items-center h-screen bg-white">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0 }}
        transition={{
          duration: 0.6,
          ease: 'easeInOut',
          repeat: Infinity,
          repeatType: 'reverse',
        }}
        className="text-3xl font-bold text-primary"
      >
        Loading...
      </motion.div>
    </div>
  );
}

export default Loading;
