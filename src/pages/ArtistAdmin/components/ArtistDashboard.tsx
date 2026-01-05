import React, { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../../../store';
import { fetchArtistDashboardData } from '../../../store/slices/Artist/artistDashboardSlice';
import { useNavigate } from 'react-router-dom';
import ArtistLayout from '../components/ArtistLayout';
import { User } from '../../../types/music.types';

import { 
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell, CartesianGrid 
} from 'recharts';
import { 
  Music, Disc, PlayCircle, Calendar, Play, Clock 
} from 'lucide-react';

const ArtistDashboard = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { stats, loading } = useSelector((state: RootState) => state.artistDashboard);
  const navigate = useNavigate();

  const storedUser = localStorage.getItem("artist_user");
  const currentUser: User | null = storedUser ? JSON.parse(storedUser) : null;
  
  const currentArtistId = currentUser?.id || 5; 

  useEffect(() => {
    if (currentArtistId) {
      dispatch(fetchArtistDashboardData(currentArtistId));
    }
  }, [dispatch, currentArtistId]);

  const chartData = useMemo(() => {
    if (!stats?.topSongs) return [];
    return stats.topSongs.slice(0, 5).map(song => ({
      name: song.title.length > 20 ? song.title.substring(0, 20) + '...' : song.title,
      fullName: song.title,
      views: song.views
    }));
  }, [stats]);

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('en-US', {
      notation: "compact",
      maximumFractionDigits: 1
    }).format(num);
  };

  const welcomeName = stats?.artistInfo?.last_name 
    || currentUser?.last_name 
    || 'Artist';

  if (loading || !stats) {
    return (
      <ArtistLayout>
        <div className="flex h-[80vh] items-center justify-center text-gray-400">
          Loading Dashboard...
        </div>
      </ArtistLayout>
    );
  }

  return (
    <ArtistLayout>
      <div className="max-w-6xl mx-auto flex flex-col gap-8">
        
        <div className="flex flex-col md:flex-row justify-between items-end gap-4">
          <div>
            <h2 className="text-3xl font-bold text-white mb-1">
              Welcome back, {welcomeName}! 👋
            </h2>
            <p className="text-gray-400">Here is an overview of your music performance.</p>
          </div>
          <div className="flex items-center gap-2 px-3 py-1.5 bg-[#2a2136] border border-[#3c314b] rounded-lg text-sm font-medium text-gray-300">
            <Calendar size={16} className="text-gray-400" />
            Last 30 Days
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
           {/* Card 1 */}
           <div className="p-6 bg-[#2a2136] rounded-xl border border-[#3c314b] shadow-sm hover:border-[#8c2bee]/30 transition-all">
              <div className="flex justify-between items-start mb-4">
                 <div className="p-3 bg-blue-500/10 rounded-lg text-blue-400">
                    <Music size={24} />
                 </div>
              </div>
              <p className="text-gray-400 text-sm font-medium">Total Songs</p>
              <h3 className="text-3xl font-bold text-white mt-1">{stats.totalSongs}</h3>
           </div>

           {/* Card 2 */}
           <div className="p-6 bg-[#2a2136] rounded-xl border border-[#3c314b] shadow-sm hover:border-[#8c2bee]/30 transition-all">
              <div className="flex justify-between items-start mb-4">
                 <div className="p-3 bg-purple-500/10 rounded-lg text-purple-400">
                    <Disc size={24} />
                 </div>
              </div>
              <p className="text-gray-400 text-sm font-medium">Total Albums</p>
              <h3 className="text-3xl font-bold text-white mt-1">{stats.totalAlbums}</h3>
           </div>

           {/* Card 3 */}
           <div className="p-6 bg-linear-to-br from-[#8c2bee] to-purple-900 rounded-xl shadow-lg shadow-purple-900/20 text-white relative overflow-hidden">
              <div className="relative z-10 flex justify-between items-start mb-4">
                 <div className="p-3 bg-white/20 rounded-lg backdrop-blur-sm">
                    <Play size={24} fill="currentColor" />
                 </div>
              </div>
              <div className="relative z-10">
                 <p className="text-white/80 text-sm font-medium">Total Views</p>
                 <h3 className="text-3xl font-bold mt-1">{formatNumber(stats.totalViews)}</h3>
              </div>
              <div className="absolute -right-6 -bottom-6 text-white opacity-10">
                 <PlayCircle size={140} />
              </div>
           </div>
        </div>

        {/* Charts & Lists */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
           <div className="lg:col-span-2 p-6 bg-[#2a2136] rounded-xl border border-[#3c314b] shadow-sm flex flex-col h-full">
              <div className="mb-6 flex justify-between">
                 <div>
                    <h3 className="text-lg font-bold text-white">Most Played Songs</h3>
                    <p className="text-sm text-gray-400">Top performance by views</p>
                 </div>
              </div>
              <div className="flex-1 h-75 w-full">
                 <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={chartData} layout="vertical" margin={{ left: 0, right: 10 }}>
                       <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} stroke="#3c314b" opacity={0.5} />
                       <XAxis type="number" hide />
                       <YAxis 
                          dataKey="name" 
                          type="category" 
                          axisLine={false} 
                          tickLine={false} 
                          width={130}
                          tick={{fill: '#9ca3af', fontSize: 13, fontWeight: 500}} 
                       />
                       <Tooltip 
                          cursor={{fill: 'rgba(255,255,255,0.05)'}}
                          contentStyle={{
                              backgroundColor: '#191022', 
                              borderColor: '#3c314b', 
                              borderRadius: '8px',
                              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.5)'
                          }}
                          itemStyle={{ color: '#e2e8f0' }} 
                          labelStyle={{ color: '#fff', fontWeight: 'bold', marginBottom: '4px' }} 
                       />
                       <Bar dataKey="views" radius={[0, 4, 4, 0]} barSize={32}>
                          {chartData.map((entry, index) => (
                             <Cell key={`cell-${index}`} fill={index === 0 ? '#8c2bee' : '#7c3aed'} />
                          ))}
                       </Bar>
                    </BarChart>
                 </ResponsiveContainer>
              </div>
           </div>

           <div className="lg:col-span-1 p-6 bg-[#2a2136] rounded-xl border border-[#3c314b] shadow-sm flex flex-col h-full">
              <h3 className="text-lg font-bold text-white mb-4">Top Performing</h3>
              <div className="flex flex-col gap-3">
                 {stats.topSongs.map((song, index) => (
                    <div key={song.id} className="flex items-center gap-3 p-2 rounded-lg hover:bg-white/5 transition-colors group cursor-pointer">
                       <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center text-gray-400 font-bold text-sm group-hover:text-white">
                          #{index + 1}
                       </div>
                       <div className="flex-1 min-w-0">
                          <p className="text-sm font-bold text-white truncate">{song.title}</p>
                          <p className="text-xs text-gray-500">Song</p>
                       </div>
                       <div className="text-sm font-bold text-[#8c2bee]">
                          {formatNumber(song.views)}
                       </div>
                    </div>
                 ))}
              </div>
              <button 
                onClick={() => navigate('/artist/songs')}
                className="mt-auto w-full py-2.5 rounded-lg border border-[#3c314b] text-sm font-bold text-gray-300 hover:bg-white/5 transition-colors"
              >
                 View All Songs
              </button>
           </div>
        </div>

        {/* Recent Uploads Table */}
        <div className="bg-[#2a2136] rounded-xl border border-[#3c314b] shadow-sm overflow-hidden">
           <div className="p-6 border-b border-[#3c314b] flex justify-between items-center">
              <h3 className="text-lg font-bold text-white">Recent Uploads</h3>
           </div>
           
           <div className="overflow-x-auto">
              <table className="w-full text-left">
                 <thead className="bg-[#221a2c] text-xs uppercase font-semibold text-gray-500">
                    <tr>
                       <th className="px-6 py-4">Track Name</th>
                       <th className="px-6 py-4">Date Added</th>
                       <th className="px-6 py-4">Duration</th>
                       <th className="px-6 py-4">Status</th>
                    </tr>
                 </thead>
                 <tbody className="divide-y divide-[#3c314b]">
                    {stats.recentUploads.map((song) => (
                       <tr key={song.id} className="hover:bg-white/5 transition-colors">
                          <td className="px-6 py-4 font-medium text-white">
                             {song.title}
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-400">
                             {new Date(song.created_at).toLocaleDateString()}
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-400 flex items-center gap-1">
                             <Clock size={14} /> {song.duration}
                          </td>
                          <td className="px-6 py-4">
                             <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-500/20 text-emerald-500">
                                Published
                             </span>
                          </td>
                       </tr>
                    ))}
                 </tbody>
              </table>
           </div>
        </div>
      </div>
    </ArtistLayout>
  );
};

export default ArtistDashboard;