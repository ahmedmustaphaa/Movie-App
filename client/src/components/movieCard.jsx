import React from 'react';
import { useNavigate } from 'react-router-dom';
import { StarIcon } from 'lucide-react';
import timeFormat from '../lib/Timeformat';

function MovieCard({ movie }) {
  const nav = useNavigate();

  const handleNavigate = () => {
    nav(`/movies/${movie._id}`);
    scrollTo(0, 0);
  };

  return (
    <div
      className="relative backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl p-4 w-72 shadow-xl hover:-translate-y-2 transition-transform duration-500 ease-in-out cursor-pointer group overflow-hidden animate-fade-in"
    >
      {/* خلفية متدرجة متوهجة خفيفة */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-700/10 via-blue-500/10 to-transparent rounded-3xl pointer-events-none"></div>

      {/* الصورة */}
      <img
        src={movie.backdrop_path}
        alt={movie.title}
        className="rounded-xl h-48 w-full object-cover object-center mb-3 transition-transform duration-500 group-hover:scale-105"
        onClick={handleNavigate}
      />

      {/* العنوان */}
      <h3 className="font-semibold text-lg text-white mb-1 truncate">{movie.title}</h3>

      {/* التفاصيل */}
      <p className="text-sm text-gray-300 mb-2">
        {new Date(movie.release_date).getFullYear()} &nbsp;&bull;&nbsp;
        {movie.genres?.slice(0, 2).map((genre) => genre.name).join(' | ')} &nbsp;&bull;&nbsp;
        {timeFormat(movie.runtime)} 
      </p>

      {/* التقييم */}
      <div className="flex items-center gap-1 text-sm text-yellow-400 mb-3">
        <StarIcon className="w-4 h-4 fill-yellow-400" />
        {movie.vote_average?.toFixed(1)}
      </div>

      {/* زر شراء */}
      <button
        onClick={handleNavigate}
        className="w-full py-2 rounded-xl bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white text-sm font-medium tracking-wide hover:opacity-90 transition-all duration-300"
      >
        Buy Ticket
      </button>
    </div>
  );
}

export default MovieCard;
