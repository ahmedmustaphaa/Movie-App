import React, { useEffect, useState } from 'react';
import { dummyShowsData } from '../../assets/assets';
import Title from './Title';

function Listshows() {
  const [shows, setShows] = useState([]);
  const [loading, setLoading] = useState(true);

  const getAllShows = async () => {
    try {
      setShows([
        {
          _id: '1',
          movie: dummyShowsData[0],
          showDateTime: "2025-06-30T02:30:00.000Z",
          showPrice: 59,
          occupiedSeats: {
            A1: "user_1",
            B1: "user_2",
            C1: "user_3"
          }
        }
      ]);
      setLoading(false);
    } catch (err) {
      console.error(err);
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
        <table className="min-w-full rounded-lg overflow-hidden shadow border border-primary/20 bg-primary/20">
          <thead className="text-left text-sm font-semibold text-gray-700 bg-primary/10 border-b border-primary/20">
            <tr>
              <th className="px-4 py-3">#</th>
              <th className="px-4 py-3">Movie Title</th>
              <th className="px-4 py-3">Price</th>
              <th className="px-4 py-3">Date & Time</th>
              <th className="px-4 py-3">Booked Seats</th>
            </tr>
          </thead>
          <tbody className="text-sm text-gray-800">
            {shows.map((show, index) => (
              <tr key={show._id} className="hover:bg-primary/10 border-b border-primary/20">
                <td className="px-4 py-3">{index + 1}</td>
                <td className="px-4 py-3">{show.movie.title}</td>
                <td className="px-4 py-3">${show.showPrice}</td>
                <td className="px-4 py-3">{new Date(show.showDateTime).toLocaleString()}</td>
                <td className="px-4 py-3">{Object.keys(show.occupiedSeats).join(', ')}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Listshows;
