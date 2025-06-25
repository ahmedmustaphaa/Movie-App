import React, { useEffect, useState } from 'react';
import Title from './Title';
import { CheckIcon } from 'lucide-react';
import { dummyShowsData } from '../../assets/assets';
import { ShareContext } from '../../../context/Appcontext';
import toast from 'react-hot-toast';
import { motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';
import Bluecircule from '../../components/Bluecircule';

function AddShow() {
  const [nowPlayingMovies, setNowPlayingMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [dateTimeSelection, setDateTimeSelection] = useState({});
  const [dateTimeInput, setDateTimeInput] = useState('');
  const [showPrice, setShowPrice] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoadingMovies, setIsLoadingMovies] = useState(true);

  const { axios, image_base_url, getToken } = ShareContext();

  useEffect(() => {
    const fetchNowPlaying = async () => {
      try {
        const token = await getToken();
        const { data } = await axios.get('/api/show/mow-playing', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setNowPlayingMovies(data.movies || dummyShowsData);
      } catch (error) {
        console.error('Error fetching movies:', error);
        setNowPlayingMovies(dummyShowsData);
      } finally {
        setIsLoadingMovies(false);
      }
    };

    fetchNowPlaying();
  }, []);

  const handleDateTimeAdd = () => {
    if (!dateTimeInput) return;
    const [date, time] = dateTimeInput.split('T');
    if (!date || !time) return;

    setDateTimeSelection((prev) => {
      const times = prev[date] || [];
      if (!times.includes(time)) {
        return {
          ...prev,
          [date]: [...times, time],
        };
      }
      return prev;
    });
    setDateTimeInput('');
  };

  const handleRemoveTime = (date, time) => {
    setDateTimeSelection((prev) => {
      const filteredTimes = prev[date].filter((t) => t !== time);
      if (filteredTimes.length === 0) {
        const { [date]: _, ...rest } = prev;
        return rest;
      }
      return {
        ...prev,
        [date]: filteredTimes,
      };
    });
  };

  const addShow = async () => {
    const showsInput = Object.entries(dateTimeSelection).map(([date, times]) => ({ date, times }));
    if (!selectedMovie || !showPrice || showsInput.length === 0) {
      toast.error('يرجى تعبئة كل الحقول المطلوبة');
      return;
    }

    const payload = {
      movieId: selectedMovie,
      showPrice: Number(showPrice),
      showsInput,
    };

    try {
      setIsSubmitting(true);
      const token = await getToken();
      await axios.post('/api/show/add', payload, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      toast.success('تمت إضافة العرض بنجاح');
      setSelectedMovie(null);
      setDateTimeSelection({});
      setShowPrice('');
    } catch (error) {
      console.error('Error adding show:', error);
      toast.error('❌ فشل في إضافة العرض');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="p-6 space-y-6 animate-fadeIn">
    <div className='relative '>
      <Bluecircule top="100px" left="-10%" />

    </div>
      <Title text1="Add" text2="Shows" />

      <div>
        <p className="text-lg font-semibold text-gray-700">Now Playing Movies</p>
        {isLoadingMovies ? (
          <div className="flex justify-center mt-6">
            <Loader2 className="animate-spin text-primary w-6 h-6" />
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
            {nowPlayingMovies.map((movie) => (
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                key={movie.id}
                onClick={() => setSelectedMovie(movie.id)}
                className={`relative cursor-pointer rounded overflow-hidden shadow-md w-full transition duration-300 border ${selectedMovie === movie.id ? 'border-primary' : 'border-transparent'}`}
              >
                <img
                  src={image_base_url + movie.poster_path}
                  alt={movie.title}
                  className="w-full h-52 object-cover"
                />
                <div className="p-2 bg-[#0000004d]">
                  <p className="font-semibold text-sm truncate text-[white]">{movie.title}</p>
                  <p className="text-[white] text-xs">{movie.release_date}</p>
                </div>
                {selectedMovie === movie.id && (
                  <div className="absolute top-2 right-2 bg-primary text-white p-1 rounded-full">
                    <CheckIcon size={14} />
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Show Price</label>
        <input
          type="number"
          value={showPrice}
          onChange={(e) => setShowPrice(e.target.value)}
          className="w-40 p-2 border rounded focus:outline-primary"
          placeholder="مثلاً: 20"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Select Date and Time</label>
        <div className="flex gap-2 items-center">
          <input
            type="datetime-local"
            value={dateTimeInput}
            onChange={(e) => setDateTimeInput(e.target.value)}
            className="p-2 border rounded focus:outline-primary"
          />
          <button
            onClick={handleDateTimeAdd}
            className="bg-primary text-white px-4 py-2 rounded hover:opacity-90 disabled:opacity-50"
            disabled={!dateTimeInput}
          >
            Add Time
          </button>
        </div>
      </div>

      {Object.keys(dateTimeSelection).length > 0 && (
        <div>
          <h3 className="text-sm font-medium mb-2">Selected Times</h3>
          {Object.entries(dateTimeSelection).map(([date, times]) => (
            <div key={date} className="mb-2">
              <strong>{date}</strong>
              <div className="flex flex-wrap gap-2 mt-1">
                {times.map((time) => (
                  <div key={time} className="bg-gray-200 px-3 py-1 rounded-full flex items-center gap-2">
                    <span>{time}</span>
                    <button
                      onClick={() => handleRemoveTime(date, time)}
                      className="text-red-600 font-bold"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      <motion.button
        whileTap={{ scale: 0.95 }}
        onClick={addShow}
        disabled={
          !selectedMovie || !showPrice || Object.keys(dateTimeSelection).length === 0 || isSubmitting
        }
        className="bg-primary text-white px-6 py-2 rounded shadow hover:opacity-90 disabled:opacity-50 flex items-center gap-2"
      >
        {isSubmitting && <Loader2 className="animate-spin w-4 h-4" />}
        {isSubmitting ? 'Adding...' : 'Add Show'}
      </motion.button>
    </div>
  );
}

export default AddShow;