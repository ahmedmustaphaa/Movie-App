import React from 'react';
import { dummyShowsData } from '../assets/assets';
import MovieCard from '../components/movieCard';
import Bluecircule from '../components/Bluecircule';
import { ShareContext } from '../../context/Appcontext';

function Movies() {

  const {show}=ShareContext()
  return (
    <section className="relative overflow-hidden  pt-[140px] pb-20 px-4 md:px-12 bg-[#0b0b0b] min-h-screen text-white ">
   

      <div className="relative z-10 max-w-[1200px] mx-auto">
         {/* Decorative Background Elements */}
      <Bluecircule top="150px" left="-80px" />
      <Bluecircule bottom="80px" right="-60px" />
      
        {/* Header */}
        <h2 className="text-3xl md:text-4xl font-extrabold mb-10 text-amber-500 tracking-wide">
          🎬 Now Showing
        </h2>

        {/* Movie Grid */}
        {show.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
            {show.map((movie, index) => (
              <MovieCard key={index} movie={movie} />
            ))}
          </div>
        ) : (
          <div className="flex justify-center items-center h-64 text-center">
            <p className="text-gray-400 text-lg">
              No movies available at the moment. Check back soon!
            </p>
          </div>
        )}
      </div>
    </section>
  );
}

export default Movies;
