import React, { useEffect, useState } from 'react';
import { dummyShowsData } from '../../assets/assets';
import Title from './Title';
import { ShareContext } from '../../../context/Appcontext';

function Listshows() {
  const [shows, setShows] = useState([]);
  const [loading, setLoading] = useState(true);

  const { axios, image_base_url, getToken } = ShareContext();

  const getAllShows = async () => {
    try {
      const token = await getToken();

      const { data } = await axios.get('/api/admin/all-shows', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (data.success) {
        setShows(data.shows);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllShows();
  }, []);

  if (loading) {
    return <div className='p-5 text-center text-lg'>Loading...</div>;
  }

  return (
    <div className='p-5'>
      <Title text1="List" text2="Shows" />

      <div className="overflow-x-auto mt-6">
        <table className="w-full text-sm text-left border-collapse rounded-lg shadow bg-white">
          <thead className="text-white bg-primary">
            <tr>
              <th className="px-4 py-3">#</th>
              <th className="px-4 py-3">🎬 Movie Title</th>
              <th className="px-4 py-3">💵 Price</th>
              <th className="px-4 py-3">🕒 Date & Time</th>
              <th className="px-4 py-3">🎟️ Booked Seats</th>
            </tr>
          </thead>
          <tbody className="text-gray-700 divide-y">
            {shows.map((show, index) => (
              <tr key={show._id} className="hover:bg-gray-50 transition-all">
                <td className="px-4 py-3 font-medium">{index + 1}</td>
                <td className="px-4 py-3">{show.movie.title}</td>
                <td className="px-4 py-3">${show.showPrice}</td>
                <td className="px-4 py-3">
                  {new Date(show.showDateTime).toLocaleString()}
                </td>
                <td className="px-4 py-3">
                  {show.occupiedSeats && show.occupiedSeats.length > 0
                    ? show.occupiedSeats.join(', ')
                    : '—'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Listshows;
