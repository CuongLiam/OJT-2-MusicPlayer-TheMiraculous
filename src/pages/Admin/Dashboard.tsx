import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store';
import { fetchDashboardData } from '../../store/slices/adminDashboardSlice';

const AdminDashboard: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const { statistics, loading, error } = useSelector((state: RootState) => state.adminDashboard);

  useEffect(() => {
    dispatch(fetchDashboardData());
  }, [dispatch]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  if (!statistics) {
    return <p>No data available</p>;
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-lg font-semibold">User Statistics</h2>
          <p>Total Users: {statistics.totalUsers}</p>
          <p>Active Users: {statistics.activeUsers}</p>
          <p>Blocked Users: {statistics.blockedUsers}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-lg font-semibold">Song Statistics</h2>
          <p>Total Songs: {statistics.totalSongs}</p>
          <p>Total Views: {statistics.totalViews?.toLocaleString?.() ?? 0}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-lg font-semibold">Album Statistics</h2>
          <p>Total Albums: {statistics.totalAlbums}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-lg font-semibold">Artist Statistics</h2>
          <p>Total Artists: {statistics.totalArtists}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-lg font-semibold">Comment Statistics</h2>
          <p>Total Comments: {statistics.totalComments}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-lg font-semibold">Genre Statistics</h2>
          <p>Total Genres: {statistics.totalGenres}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-lg font-semibold">Subscription Statistics</h2>
          <p>Total Revenue: {statistics.revenue ? statistics.revenue.toLocaleString() : 0} VND</p>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
