import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';

import Bluecircule from '../components/Bluecircule';
import { Heart, PlayCircleIcon, StarIcon } from 'lucide-react';
import timeFormat from '../lib/Timeformat';
import Dateselect from '../lib/Dateselect';
import MovieCard from '../components/movieCard';
import { ShareContext } from '../../context/Appcontext';
import { toast } from 'react-hot-toast';

function MovieDetails() {
  const { id } = useParams();
  const { axios, favourite, image_base_url, getToken, getFavorites, show } = ShareContext();

  const [showMovie, setshowMovie] = useState(null);
  const [isFav, setIsFav] = useState(false);
  const nav = useNavigate();

  useEffect(() => {
    const getSingleMovie = async () => {
      try {
        const { data } = await axios(`/api/show/${id}`);
        setshowMovie(data);
      } catch (error) {
        console.log(error);
      }
    };

    getSingleMovie();

    const isFavorite = favourite.some((movie) => movie._id === id);
    setIsFav(isFavorite);
  }, [id, favourite]);

  const handleFavorite = async () => {
    try {
      const token = await getToken();
      const { data } = await axios.post(
        '/api/user/update-favorite',
        { movieId: id },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (data.success) {
        toast.success('تم التحديث بنجاح ✅');
        setIsFav(!isFav);
        getFavorites();
      }
    } catch (error) {
      toast.error('فشل في التحديث');
      console.log(error);
    }
  };

  return showMovie ? (
    <div className="relative px-6 md:px-16 lg:px-40 pt-28 pb-20 text-white min-h-screen bg-[#0b0b0b] overflow-hidden">
      <div className="relative z-10 flex flex-col md:flex-row gap-12 max-w-6xl mx-auto items-start">
        <img
          src={image_base_url + showMovie.movie.poster_path}
          alt={showMovie.movie.title}
          className="rounded-xl h-[400px] w-[270px] object-cover shadow-lg"
        />

        <div className="flex-1">
          <Bluecircule />
          <p className="text-primary font-medium tracking-wide">LANGUAGE: ENGLISH</p>

          <h1 className="text-4xl font-extrabold mb-4">{showMovie.movie.title}</h1>

          <div className="flex items-center gap-2 text-yellow-400 mb-3">
            <StarIcon className="w-5 h-5 fill-yellow-400" />
            <span className="text-sm">{showMovie.movie.vote_average?.toFixed(1)} / 10 rating</span>
          </div>

          <p className="text-gray-300 mb-6 w-[60%]">{showMovie.movie.overview}</p>

          <p className="text-gray-400 text-sm mb-2">
            <span className="font-semibold text-white">Runtime:</span> {timeFormat(showMovie.movie.runtime)}
          </p>

          <p className="text-gray-400 text-sm mb-2">
            <span className="font-semibold text-white">Genres:</span> {showMovie.movie.genres?.map((g) => g.name).join(' | ')}
          </p>

          <p className="text-gray-400 text-sm">
            <span className="font-semibold text-white">Release Year:</span>{' '}
            {new Date(showMovie.movie.release_date).getFullYear()}
          </p>

          <div className="flex items-center flex-wrap gap-4 mt-4">
            <PlayCircleIcon className='w-5 h-5' />
            <button className='flex items-center gap-2 px-7 py-3 text-sm bg-gray-800 hover:bg-gray-900 transition rounded-md font-medium cursor-pointer active:scale-95'>
              Watch Trailer
            </button>
            <a href="#" className="bg-amber-600 hover:bg-amber-700 text-white px-6 py-2 rounded-full text-sm font-medium transition-transform transform hover:scale-105 shadow-md">
              🎟 Buy Ticket
              
            </a>
            <button
              onClick={handleFavorite}
              className="p-2 rounded-full bg-gray-800 hover:bg-gray-700 text-white transition-transform transform hover:scale-110 shadow-sm"
              aria-label="Add to Favorites"
            >
              <Heart className={`w-5 h-5 ${isFav ? 'fill-primary text-primary' : ''}`} />
            </button>
          </div>
        </div>
      </div>

      <p className='text-2xl font-medium mt-20'>Your Favorite Cast</p>
      <div className='overflow-x-auto no-scrollbar mt-8 pb-4'>
        <div className='flex items-center gap-4 w-max px-4'>
          {showMovie.movie.casts.slice(0, 12).map((cast) => (
            <div key={cast.id || cast.name} className='text-center flex items-center flex-col justify-center gap-4'>
               (
                <img
                  src={image_base_url + cast.profile_path}
                  className='rounded-full h-20 md:h-20 aspect-square object-cover'
                  alt={cast.name}
                />
              ) : (
                <div className='rounded-full h-20 w-20 bg-gray-700 flex items-center justify-center text-xs text-white'>
                  No Image
                </div>
              )
              <p className="text-sm">{cast.name}</p>
            </div>
          ))}
        </div>
        <Dateselect datetime={showMovie.dateTime} id={id} />
      </div>

      <p className='text-lg font-medium mt-20 mb-8'>You May Also Like</p>
      <div className='flex flex-wrap w-[90%] max-sm:justify-center gap-4'>
        {show.slice(0, 4).map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
      <div className='flex justify-center mt-4'>
        <button
          onClick={() => {
            nav('/movies');
            scrollTo(0, 0);
          }}
          className='flex items-center gap-2 px-7 py-3 text-sm bg-gray-800 hover:bg-gray-900 transition rounded-md font-medium cursor-pointer active:scale-95'
        >
          Show More
        </button>
      </div>
    </div>
  ) : (
    <div className="min-h-screen flex justify-center items-center bg-black text-white text-lg">Loading...</div>
  );
}

export default MovieDetails;
