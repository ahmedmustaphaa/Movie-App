import React, { useEffect, useState } from 'react';
import { dummyShowsData } from '../../assets/assets';
import Title from './Title';
import { ShareContext } from '../../../context/Appcontext';
import { Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';
import Bluecircule from '../../components/Bluecircule';

function ListShows() {
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

      console.log(data);

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
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="w-8 h-8 text-primary animate-spin" />
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className='relative'>
        <Bluecircule top="100px" left="-10%" />
        <Bluecircule top='-100px' left='0' />
      </div>
      <Title text1="List" text2="Shows" />

      <div className="overflow-x-auto mt-6">
        <motion.table
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="min-w-full text-sm text-left border-collapse rounded-lg shadow-md bg-white overflow-hidden"
        >
          <thead className="text-white bg-primary">
            <tr>
              <th className="  md:px-4 py-3 text-xs uppercase tracking-wider">#</th>
              <th className="md:px-4 py-3 text-xs uppercase tracking-wider">🎬 Movie Title</th>
              <th className="md:px-4 py-3 text-xs uppercase tracking-wider">💵 Price</th>
              <th className="md:px-4 py-3 text-xs uppercase tracking-wider">🕒 Date & Time</th>
              <th className="md:px-4 py-3 text-xs uppercase tracking-wider">🎟️ Booked Seats</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 text-gray-700">
            {shows.map((show, index) => (
              <tr
                key={show._id}
                className="hover:bg-gray-50 transition duration-200 ease-in-out"
              >
                <td className="px-4 py-3 font-semibold text-sm text-gray-800">{index + 1}</td>
                <td className="px-4 py-3 text-sm">{show.movie.title}</td>
                <td className="px-4 py-3 text-sm text-green-600 font-medium">${show.showPrice}</td>
                <td className="px-4 py-3 text-sm">
                  {new Date(show.showDateTime).toLocaleString()}
                </td>
                <td className="px-4 py-3 text-sm">
                  {show.occupiedSeats && show.occupiedSeats.length > 0
                    ? show.occupiedSeats.join(', ')
                    : <span className="text-gray-400">{"A,c"}</span>}
                </td>
              </tr>
            ))}
          </tbody>
        </motion.table>
      </div>
    </div>
  );
}

export default ListShows;