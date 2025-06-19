import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { dummyDateTimeData, dummyShowsData } from '../assets/assets';
import Bluecircule from '../components/Bluecircule';
import { Heart, PlayCircleIcon, StarIcon } from 'lucide-react';
import timeFormat from '../lib/Timeformat';
import Dateselect from '../lib/Dateselect';
import MovieCard from '../components/movieCard';

function MovieDetails() {
  const { id } = useParams();
  const [show, setShow] = useState(null);
const nav=useNavigate();
  useEffect(() => {
    const foundShow = dummyShowsData.find(show => show._id === id);
    if (foundShow) {
      setShow({
        movie: foundShow,
        dateTime: dummyDateTimeData
      });
    }
  }, [id]);

  return show ? (
    <div className="relative px-6 md:px-16 lg:px-40 pt-28 pb-20 text-white min-h-screen bg-[#0b0b0b] overflow-hidden">
     

      <div className="relative z-10 flex flex-col md:flex-row gap-12 max-w-6xl mx-auto items-start">
        {/* صورة البوستر */}
        <img
          src={show.movie.poster_path}
          alt={show.movie.title}
          className="rounded-xl h-[400px] w-[270px] object-cover shadow-lg"
        />

        {/* التفاصيل */}
        <div className="flex-1">
        <Bluecircule/>
          <p className="text-primary font-medium tracking-wide">LANGUAGE: ENGLISH</p>

          <h1 className="text-4xl font-extrabold mb-4">{show.movie.title}</h1>

          {/* التقييم */}
          <div className="flex items-center gap-2 text-yellow-400 mb-3">
            <StarIcon className="w-5 h-5 fill-yellow-400" />
            <span className="text-sm">
              {show.movie.vote_average?.toFixed(1)} / 10 rating
            </span>
          </div>

          {/* الوصف */}
          <p className="text-gray-300 mb-6 w-[60%]">{show.movie.overview}</p>

          {/* معلومات إضافية */}
          <p className="text-gray-400 text-sm mb-2">
            <span className="font-semibold text-white">Runtime:</span> {timeFormat(show.movie.runtime)}
          </p>

          <p className="text-gray-400 text-sm mb-2">
            <span className="font-semibold text-white">Genres:</span> {show.movie.genres?.map(g => g.name).join(' | ')}
          </p>

          <p className="text-gray-400 text-sm">
            <span className="font-semibold text-white">Release Year:</span>{' '}
            {new Date(show.movie.release_date).getFullYear()}
          </p>
           <div className='flex items-center flex-wrap gap-4 mt-4'>
        <PlayCircleIcon className='w-5 h-5'/>
        <button className='flex items-center gap-2 px-7 py-3 text-sm bg-gray-800 hover:bg-gray-900 transition rounded-md font-medium cursor-pointer  active:scale-95'>watch trailer</button>
     <a
    href="#"
    className="bg-amber-600 hover:bg-amber-700 text-white px-6 py-2 rounded-full text-sm font-medium transition-transform transform hover:scale-105 shadow-md"
  >
    🎟 Buy Tickets
  </a>

  {/* Favorite Button */}
  <button
    className="p-2 rounded-full bg-gray-800 hover:bg-gray-700 text-white transition-transform transform hover:scale-110 shadow-sm"
    aria-label="Add to Favorites"
  >
    <Heart className="w-5 h-5" />
  </button>
        </div>
        </div>
       
      </div>
      <p className='text-2xl font-medium mt-20'>your favorite cast</p>
      <div className='overflow-x-auto no-scrollbar mt-8 pb-4'>
      <div className='flex items-center gap-4 w-max px-4'>
      {show.movie.casts.slice(0,12).map((cast)=>{
   return(
         <div className='text-center flex items-center flex-col justify-center gap-4'>
         <img src={cast.profile_path} className='rounded-full h-20 md:h-20 aspect-square object-fit'></img>
         <p>{cast.name}</p>
         
         </div>
   )
      })}
      </div>
      <Dateselect datetime={show.dateTime} id={id}/>

     
      </div>

       <p className='text-lg font-medium mt-20 mb-8'>You may Aslo Like</p>
       <div className='flex flex-wrap w-[90%] max-sm:justify-center gap-4'>
       {dummyShowsData.slice(0,4).map((movie)=>{
       return <MovieCard movie={movie}/>
       })}
       </div>
       <div className='flex justify-center mt-4'>
       <button onClick={()=>{nav('/movies'),scrollTo(0,0)}} className='flex items-center gap-2 px-7 py-3 text-sm bg-gray-800 hover:bg-gray-900 transition rounded-md font-medium cursor-pointer  active:scale-95'>Show More</button>
       </div>


    </div>
  ) : (
    <div className="min-h-screen flex justify-center items-center bg-black text-white text-lg">Loading...</div>
  );
}

export default MovieDetails;
