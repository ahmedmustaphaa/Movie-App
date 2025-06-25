import { ArrowRight } from 'lucide-react';
import React from 'react';
import { useNavigate } from 'react-router';
import Bluecircule from './Bluecircule';
import { ShareContext } from '../../context/Appcontext';
import MovieCard from './movieCard';

function FeaturesSection() {
  const { show } = ShareContext();
  const nav = useNavigate();
  
  return (
    <div className='px-6 md:px-16 lg:px-44 overflow-hidden'>
      <div className='flex items-center relative justify-between pt-20 pb-10'>
        <Bluecircule top='0' right='-80px' />
        <p className='text-gray-300 font-medium text-lg'>Now Showing</p>
        <button 
          className='group flex items-center gap-2 text-sm text-gray-200'
          onClick={() => nav('/movies')}
        >
          View all 
          <ArrowRight className='group-hover:translate-x-0.5 transition w-5 h-5' />
        </button>
      </div>
      <div className='flex flex-wrap justify-center gap-4 w-full'>
        {show.slice(0, 4).map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
      <div className='w-full flex items-center'>
        <button 
          className='my-10 mx-auto px-12 py-4 rounded-lg text-sm bg-primary hover:bg-primary-dull transition font-medium cursor-pointer' 
          onClick={() => { nav('/movies'); scrollTo(0, 0); }}
        >
          Show more
        </button>
      </div>
    </div>
  );
}

export default FeaturesSection;