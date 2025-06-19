import React, { useEffect, useState } from 'react';
import Title from './Title';
import {
  ChartLineIcon,
  CircleDollarSignIcon,
  PlayCircleIcon,
  UsersIcon,
  StarIcon
} from 'lucide-react';
import Bluecircule from '../../components/Bluecircule';
import { dateFormat } from '../../lib/DateFormat';

const currency = '$'; // يمكنك تغييره حسب عملتك

function Dashboard() {
  const [dashboardData, setDashboardData] = useState({
    totalBookings: 0,
    totalRevenue: 0,
    activeShows: [],
    totalUser: 0
  });

  const [loading, setLoading] = useState(true);

  const dashboardCards = [
    { title: 'Total Bookings', value: dashboardData.totalBookings || "0", icon: ChartLineIcon },
    { title: 'Total Revenue', value: dashboardData.totalRevenue || "0", icon: CircleDollarSignIcon },
    { title: 'Active Shows', value: dashboardData.activeShows.length || "0", icon: PlayCircleIcon },
    { title: 'Total Users', value: dashboardData.totalUser || "0", icon: UsersIcon },
  ];

  const fetchDashboardData = async () => {
    const dummyDashboardData = {
      totalBookings: 12,
      totalRevenue: 2500,
      totalUser: 34,
      activeShows: [
        {
          _id: '1',
          showPrice: 150,
          showDateTime: '2025-06-18T18:30:00',
          movie: {
            title: 'Inception',
            poster_path: '/images/inception.jpg',
            vote_average: 8.7
          }
        },
        {
          _id: '2',
          showPrice: 120,
          showDateTime: '2025-06-20T20:00:00',
          movie: {
            title: 'Interstellar',
            poster_path: '/images/interstellar.jpg',
            vote_average: 8.6
          }
        }
      ]
    };

    setDashboardData(dummyDashboardData);
    setLoading(false);
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  if (loading) {
    return <div className="p-5">Loading...</div>;
  }

  return (
    <div>
      <Title text1="Admin" text2="dashboard" />
      <div className="relative p-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Bluecircule top='-100px' left='0' />
        {dashboardCards.map((card, index) => {
          const Icon = card.icon;
          return (
            <div key={index} className="bg-primary/10 border border-primary/20 p-4 rounded shadow flex items-center gap-4">
              <Icon className="w-6 h-6 text-primary" />
              <div>
                <h3 className="text-gray-600">{card.title}</h3>
                <p className="text-xl font-bold">{card.value}</p>
              </div>
            </div>
          );
        })}
      </div>

      <p className="mt-10 text-lg font-medium">Active shows</p>
      <div className="relative flex flex-wrap gap-6 mt-4 max-w-5xl">
        <Bluecircule top="100px" left="-10%" />
        {dashboardData.activeShows.map((show) => (
          <div
            key={show._id}
            className="w-55 rounded-lg overflow-hidden h-full pb-3 bg-primary/10 border border-primary/20 hover:translate-y-1 transition duration-300"
          >
            <img
              src={show.movie.poster_path}
              alt=""
              className="h-60 w-full object-cover"
            />
            <p className="font-medium p-2 truncate">
              {show.movie.title}
            </p>
            <div className="flex items-center justify-between px-2">
              <p className="text-lg font-medium">
                {currency} {show.showPrice}
              </p>
              <div className="flex items-center gap-1 text-sm text-gray-400 mt-1 pr-1">
                <StarIcon className="w-4 h-4 text-primary fill-primary" />
                {show.movie.vote_average.toFixed(1)}
              </div>
            </div>
            <p className="px-2 pt-2 text-sm text-gray-500">
              {dateFormat(show.showDateTime)}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Dashboard;
