import React, { useEffect, useState } from 'react';
import Title from './Title';
import { CheckIcon, StarIcon } from 'lucide-react';
import { dummyShowsData } from '../../assets/assets';
import { kconverter } from '../../lib/KConverter';
import { ShareContext } from '../../../context/Appcontext';
import toast from 'react-hot-toast';

function Addshow() {
  const [nowPlayingMovies, setNowPlayingMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [dateTimeSelection, setDateTimeSelection] = useState({});
  const [dateTimeInput, setDateTimeInput] = useState("");
  const [showPrice, setShowPrice] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { axios, image_base_url, getToken } = ShareContext();

  // جلب الأفلام
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
        console.error("Error fetching movies:", error);
        setNowPlayingMovies(dummyShowsData);
      }
    };

    fetchNowPlaying();
  }, []);

  // إضافة تاريخ ووقت
  const handleDateTimeAdd = () => {
    if (!dateTimeInput) return;
    const [date, time] = dateTimeInput.split("T");
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

    setDateTimeInput("");
  };

  // إزالة وقت معين
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

  // إرسال العرض إلى السيرفر
  const addShow = async () => {
    const showsInput = Object.entries(dateTimeSelection).map(([date, times]) => ({
      date,
      times,
    }));

    if (!selectedMovie || !showPrice || showsInput.length === 0) {
      alert("يرجى تعبئة كل الحقول المطلوبة");
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

      const { data } = await axios.post('/api/show/add', payload, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
          toast.success("Movie addedd successfully")
      setSelectedMovie(null);
      setDateTimeSelection({});
      setShowPrice("");
    } catch (error) {
      console.error("Error adding show:", error);
      alert("❌ فشل في إضافة العرض. تأكد من البيانات.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="p-5">
      <Title text1="Add" text2="Shows" />
      <p className="mt-10 text-lg font-medium">Now Playing Movies</p>

      <div className="flex flex-wrap gap-4 mt-4">
        {nowPlayingMovies.map((movie) => (
          <div
            key={movie.id}
            onClick={() => setSelectedMovie(movie.id)}
            className={`relative max-w-40 cursor-pointer border ${selectedMovie === movie.id ? 'border-primary' : 'border-transparent'} hover:-translate-y-1 transition`}
          >
            <img
              src={image_base_url + movie.poster_path}
              alt={movie.title}
              className="w-full rounded object-cover"
            />
            <div className="text-sm p-2">
              <p className="font-medium truncate">{movie.title}</p>
              <p className="text-gray-400 text-sm">{movie.release_date}</p>
            </div>
            {selectedMovie === movie.id && (
              <div className="absolute top-2 right-2 bg-primary text-white p-1 rounded-full">
                <CheckIcon size={14} />
              </div>
            )}
          </div>
        ))}
      </div>

      {/* سعر العرض */}
      <div className="mt-6">
        <label className="block text-sm mb-1">Show Price</label>
        <input
          type="number"
          value={showPrice}
          onChange={(e) => setShowPrice(e.target.value)}
          className="w-40 p-2 border rounded"
          placeholder="مثلاً: 20"
        />
      </div>

      {/* إدخال وقت وتاريخ العرض */}
      <div className="mt-6">
        <label className="block text-sm mb-1">Select Date and Time</label>
        <div className="flex gap-2 items-center">
          <input
            type="datetime-local"
            value={dateTimeInput}
            onChange={(e) => setDateTimeInput(e.target.value)}
            className="p-2 border rounded"
          />
          <button
            onClick={handleDateTimeAdd}
            className="bg-primary text-white px-3 py-2 rounded"
            disabled={!dateTimeInput}
          >
            Add Time
          </button>
        </div>
      </div>

      {/* عرض الأوقات المختارة */}
      {Object.keys(dateTimeSelection).length > 0 && (
        <div className="mt-6">
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

      {/* زر إرسال */}
      <button
        onClick={addShow}
        disabled={
          !selectedMovie || !showPrice || Object.keys(dateTimeSelection).length === 0 || isSubmitting
        }
        className="mt-6 bg-primary text-white px-4 py-2 rounded disabled:opacity-50"
      >
        {isSubmitting ? "Adding..." : "Add Show"}
      </button>
    </div>
  );
}

export default Addshow;
