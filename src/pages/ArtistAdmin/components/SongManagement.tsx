import { useEffect, useState, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../../store';
import { 
  fetchArtistSongs, 
  deleteSong, 
  createSong, 
  updateSong 
} from '../../../store/slices/Artist/artistSongSlice';
import ArtistLayout from '../components/ArtistLayout';
import SongModal from '../components/AddSongModal';
import { User, Song } from '../../../types/music.types';
import { 
  Play, Edit, Trash2, Plus, Search, Filter, 
  Eye, Check, ArrowUpDown 
} from 'lucide-react';
import { message, Modal } from 'antd';

// Định nghĩa các kiểu lọc
type FilterType = 'default' | 'views' | 'duration' | 'date';

const SongManagement = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { songs, albums, loading } = useSelector((state: RootState) => state.artistSong);
  

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingSong, setEditingSong] = useState<Song | null>(null);

  // State tìm kiếm & Lọc
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState<FilterType>('default');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5; 


  const storedUser = localStorage.getItem("artist_user");
  const currentUser: User | null = storedUser ? JSON.parse(storedUser) : null;
  const currentArtistId = currentUser?.id || 5;

  useEffect(() => {
    if (currentArtistId) {
      dispatch(fetchArtistSongs(currentArtistId));
    }
  }, [dispatch, currentArtistId]);


  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, filterType]);


  const parseDurationToSeconds = (duration: string) => {
    if (!duration) return 0;
    const parts = duration.split(':').map(Number);
    if (parts.length === 2) return parts[0] * 60 + parts[1];
    if (parts.length === 3) return parts[0] * 3600 + parts[1] * 60 + parts[2];
    return 0;
  };


  const processedSongs = useMemo(() => {
    let result = songs.filter(song => 
      song.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return result.sort((a, b) => {
      switch (filterType) {
        case 'views': return (b.views || 0) - (a.views || 0);
        case 'duration': return parseDurationToSeconds(b.duration) - parseDurationToSeconds(a.duration);
        case 'date': return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
        default: return 0;
      }
    });
  }, [songs, searchTerm, filterType]);


  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentSongs = processedSongs.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(processedSongs.length / itemsPerPage);


  const handleAddNew = () => {
    setEditingSong(null);
    setIsModalOpen(true);
  };

  const handleEdit = (song: Song) => {
    setEditingSong(song); // Fill dữ liệu bài hát cũ vào form
    setIsModalOpen(true);
  };

  const handleSaveSong = async (formData: FormData) => {
    try {
      if (editingSong) {

        await dispatch(updateSong({ id: editingSong.id, data: formData })).unwrap();
        message.success('Song update successful!');
      } else {
        // Tạo mới
        await dispatch(createSong(formData)).unwrap();
        message.success('New song added successfully!');
      }
      setIsModalOpen(false);
    } catch (error) {
      console.error(error);
      message.error('An error occurred, please try again.');
    }
  };

  const handleDelete = (songId: string) => {
    Modal.confirm({
      title: 'Delete songs?',
      content: 'Are you sure you want to delete this song? This action cannot be undone.',
      okText: 'Delete',
      okType: 'danger',
      cancelText: 'Cancel',
      onOk: async () => {
        try {
          await dispatch(deleteSong(songId)).unwrap();
          message.success('The song has been deleted.');
        } catch (error) {
          message.error('Delete failed.');
        }
      }
    });
  };


  const handlePageChange = (pageNumber: number) => setCurrentPage(pageNumber);

  const getAlbumInfo = (albumId: number | string) => {
    const album = albums.find(a => String(a.id) === String(albumId));
    return {
      name: album?.title || "Single",
      cover: album?.cover_image || "https://placehold.co/100x100/2a2136/FFF?text=No+Cover"
    };
  };

  const formatViews = (views: number) => new Intl.NumberFormat('en-US').format(views);

  const getFilterLabel = () => {
    switch (filterType) {
      case 'views': return 'Most Views';
      case 'duration': return 'Longest Duration';
      case 'date': return 'Newest Date';
      default: return 'Default';
    }
  };

  return (
    <ArtistLayout>
      <div className="max-w-7xl mx-auto flex flex-col gap-6" onClick={() => isFilterOpen && setIsFilterOpen(false)}>
        
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-end gap-4">
          <div>
            <h2 className="text-3xl font-bold text-white mb-2">Song Management</h2>
            <p className="text-gray-400">Manage your playlists and track your song performance.</p>
          </div>
          {/* Nút Add New */}
          <button 
            onClick={handleAddNew}
            className="flex items-center gap-2 bg-[#8c2bee] hover:bg-[#7b24d3] text-white px-5 py-2.5 rounded-xl font-bold transition-all shadow-lg shadow-purple-900/20 active:scale-95"
          >
            <Plus size={20} /> Add new song
          </button>
        </div>

        {/* Filter Bar */}
        <div className="bg-[#2a2136] p-4 rounded-xl border border-[#3c314b] flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input 
              type="text" 
              placeholder="Search for songs by title..." 
              className="w-full pl-10 pr-4 py-2.5 bg-[#191022] border border-[#3c314b] rounded-lg text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-[#8c2bee]/50 transition-all"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          {/* Filter Dropdown */}
          <div className="relative">
            <button 
              onClick={(e) => {
                e.stopPropagation();
                setIsFilterOpen(!isFilterOpen);
              }}
              className={`px-4 py-2.5 bg-[#191022] border border-[#3c314b] rounded-lg text-gray-300 font-medium flex items-center gap-2 hover:bg-[#3c314b] transition-colors min-w-35 justify-between ${isFilterOpen ? 'ring-2 ring-[#8c2bee]/50' : ''}`}
            >
              <div className="flex items-center gap-2">
                <Filter size={16} /> 
                <span className="text-sm">{getFilterLabel()}</span>
              </div>
              <ArrowUpDown size={14} className="text-gray-500" />
            </button>

            {isFilterOpen && (
              <div className="absolute top-full right-0 mt-2 w-48 bg-[#191022] border border-[#3c314b] rounded-xl shadow-xl z-50 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
                <div className="py-1">
                  {['default', 'views', 'duration', 'date'].map((type) => (
                    <button 
                      key={type}
                      onClick={() => setFilterType(type as FilterType)}
                      className="w-full px-4 py-2.5 text-left text-sm text-gray-300 hover:bg-[#8c2bee] hover:text-white flex items-center justify-between group"
                    >
                      <span className="capitalize">{type === 'default' ? 'Default' : type === 'date' ? 'Date Posted' : type === 'duration' ? 'Duration' : 'Most Views'}</span>
                      {filterType === type && <Check size={16} />}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Table Container */}
        <div className="bg-[#2a2136] rounded-xl border border-[#3c314b] overflow-hidden shadow-sm flex flex-col min-h-125">
          
          {loading ? (
             <div className="flex-1 flex items-center justify-center text-gray-400">Loading song data...</div>
          ) : processedSongs.length === 0 ? (
             <div className="flex-1 flex items-center justify-center text-gray-400">No songs found.</div>
          ) : (
            <>
              {/* TABLE */}
              <div className="overflow-x-auto flex-1">
                <table className="w-full text-left border-collapse">
                  <thead className="bg-[#221a2c] text-xs uppercase font-bold text-gray-500 border-b border-[#3c314b]">
                    <tr>
                      <th className="px-6 py-4 w-16">ID</th>
                      <th className="px-6 py-4 w-20">Artwork</th>
                      <th className="px-6 py-4">Title</th>
                      <th className="px-6 py-4">Duration</th>
                      <th className="px-6 py-4">Views</th>
                      <th className="px-6 py-4">Date posted</th>
                      <th className="px-6 py-4 text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#3c314b] text-sm">
                    {currentSongs.map((song, index) => {
                      const albumInfo = getAlbumInfo(song.album_id);
                      const realIndex = indexOfFirstItem + index + 1;
                      
                      return (
                        <tr key={song.id} className="group hover:bg-[#3c314b]/30 transition-colors">
                          <td className="px-6 py-4 text-gray-500 font-mono">#{String(realIndex).padStart(3, '0')}</td>
                          <td className="px-6 py-4">
                            <div className="relative w-12 h-12 rounded-lg overflow-hidden shadow-md group-hover:shadow-[#8c2bee]/20 transition-all">
                              <img src={albumInfo.cover} alt={song.title} className="w-full h-full object-cover"/>
                              <div className="absolute inset-0 bg-black/40 hidden group-hover:flex items-center justify-center cursor-pointer backdrop-blur-[1px]">
                                <Play size={20} className="text-white fill-white" />
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex flex-col">
                              <span className="font-bold text-white text-base line-clamp-1">{song.title}</span>
                              <span className="text-xs text-gray-500 mt-1 line-clamp-1">Album: {albumInfo.name}</span>
                            </div>
                          </td>
                          <td className="px-6 py-4 text-gray-400 font-medium">{song.duration}</td>
                          <td className="px-6 py-4">
                             <div className="flex items-center gap-1.5 text-emerald-400 font-bold">
                                <Eye size={14} /> {formatViews(song.views || 0)}
                             </div>
                          </td>
                          <td className="px-6 py-4 text-gray-400">{new Date(song.created_at).toLocaleDateString('vi-VN')}</td>
                          
                          {/* ACTION BUTTONS */}
                          <td className="px-6 py-4 text-right">
                            <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                              <button 
                                onClick={() => handleEdit(song)}
                                className="p-2 hover:bg-[#8c2bee] hover:text-white rounded-lg text-gray-400 transition-colors"
                              >
                                <Edit size={16} />
                              </button>
                              <button 
                                onClick={() => handleDelete(song.id)}
                                className="p-2 hover:bg-red-500/10 hover:text-red-500 rounded-lg text-gray-400 transition-colors"
                              >
                                <Trash2 size={16} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              {/* PAGINATION */}
              <div className="px-6 py-4 border-t border-[#3c314b] flex flex-col sm:flex-row justify-between items-center gap-4 bg-[#2a2136]">
                 <span className="text-xs text-gray-500 font-medium">
                    Show {indexOfFirstItem + 1}-{Math.min(indexOfLastItem, processedSongs.length)} on total {processedSongs.length} songs
                 </span>
                 <div className="flex gap-2">
                    <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1} className="px-3 py-1.5 rounded-lg border border-[#3c314b] text-gray-400 text-xs font-bold hover:bg-white/5 disabled:opacity-30 disabled:cursor-not-allowed transition-all">Previous</button>
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((number) => (
                      <button key={number} onClick={() => handlePageChange(number)} className={`w-8 h-8 rounded-lg text-xs font-bold flex items-center justify-center transition-all ${currentPage === number ? "bg-[#8c2bee] text-white shadow-lg shadow-purple-900/40 scale-110" : "border border-[#3c314b] text-gray-400 hover:bg-white/5"}`}>{number}</button>
                    ))}
                    <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages} className="px-3 py-1.5 rounded-lg border border-[#3c314b] text-gray-400 text-xs font-bold hover:bg-white/5 disabled:opacity-30 disabled:cursor-not-allowed transition-all">Next</button>
                 </div>
              </div>
            </>
          )}
        </div>

      </div>

      {/* RENDER MODAL */}
      {isModalOpen && (
        <SongModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          initialData={editingSong}
          onSave={handleSaveSong}
          artistId={currentArtistId}
          albums={albums}
        />
      )}

    </ArtistLayout>
  );
};

export default SongManagement;