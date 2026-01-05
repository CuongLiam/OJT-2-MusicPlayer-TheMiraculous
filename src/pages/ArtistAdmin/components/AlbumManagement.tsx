import React, { useEffect, useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../store";
import {
  fetchArtistAlbums,
  createAlbum,
  updateAlbum,
  deleteAlbum,
} from "../../../store/slices/Artist/artistAlbumSlice";
import AddAlbumModal from "../components/AddAlbumModal";
import { message, Modal } from "antd";
import { fetchArtistSongs } from "../../../store/slices/Artist/artistSongSlice";
import ArtistLayout from "../components/ArtistLayout";
import { User, Album } from "../../../types/music.types";
import {
  Disc,
  Edit,
  Trash2,
  Plus,
  Search,
  Calendar,
  Layers,
  ChevronDown,
  Check,
  Crown,
  Unlock,
  ArrowUpDown,
} from "lucide-react";

type SortType = "newest" | "oldest" | "most_tracks" | "least_tracks";
type FilterType = "all" | "FREE" | "PREMIUM";

const AlbumManagement = () => {
  const dispatch = useDispatch<AppDispatch>();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingAlbum, setEditingAlbum] = useState<Album | null>(null);

  const { albums, loading: albumLoading } = useSelector(
    (state: RootState) => state.artistAlbum
  );
  const { songs } = useSelector((state: RootState) => state.artistSong);

  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState<FilterType>("all");
  const [sortType, setSortType] = useState<SortType>("newest");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isSortOpen, setIsSortOpen] = useState(false);

  const storedUser = localStorage.getItem("artist_user");
  const currentUser: User | null = storedUser ? JSON.parse(storedUser) : null;
  const currentArtistId = currentUser?.id || 5;

  useEffect(() => {
    if (currentArtistId) {
      dispatch(fetchArtistAlbums(currentArtistId));
      dispatch(fetchArtistSongs(currentArtistId));
    }
  }, [dispatch, currentArtistId]);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, filterType, sortType]);

  const handleOpenAdd = () => {
    setEditingAlbum(null);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (album: Album) => {
    setEditingAlbum(album);
    setIsModalOpen(true);
  };

  const handleDelete = (id: string | number) => {
    Modal.confirm({
      title: "Delete album?",
      content: "Are you sure you want to delete this album? This action cannot be undone.",
      okText: "Delete",
      okType: "danger",
      cancelText: "Cancel",
      onOk: async () => {
        try {
          await dispatch(deleteAlbum(id)).unwrap();
          message.success("Album successfully deleted.");
        } catch (error) {
          message.error("Error while deleting album");
        }
      },
    });
  };

  const handleSaveAlbum = async (albumData: any) => {
    try {
      if (editingAlbum) {
        await dispatch(updateAlbum({ id: editingAlbum.id, data: albumData })).unwrap();
        message.success("Album update successful!");
      } else {
        await dispatch(createAlbum(albumData)).unwrap();
        message.success("New album created successfully!");
      }
      setIsModalOpen(false);
    } catch (error) {
      message.error("An error occurred, please try again.");
    }
  };


  const getTrackCount = (albumId: number | string) => {
    return songs.filter((song) => String(song.album_id) === String(albumId)).length;
  };

  const getTypeBadgeColor = (type: string) => {
    switch (type?.toUpperCase()) {
      case "PREMIUM":
        return "bg-yellow-500/10 text-yellow-500 border-yellow-500/20 shadow-[0_0_10px_rgba(234,179,8,0.1)]";
      case "FREE":
        return "bg-emerald-500/10 text-emerald-500 border-emerald-500/20";
      default:
        return "bg-gray-500/10 text-gray-400 border-gray-500/20";
    }
  };

  const getTypeIcon = (type: string) => {
    if (type?.toUpperCase() === "PREMIUM")
      return <Crown size={12} className="mr-1 mb-0.5 inline" />;
    return <Unlock size={12} className="mr-1 mb-0.5 inline" />;
  };

  const processedAlbums = useMemo(() => {
    let result = [...albums];
    result = result.filter((album) => {
      const matchName = album.title.toLowerCase().includes(searchTerm.toLowerCase());
      const typeToCheck = album.type || "FREE";
      const matchType = filterType === "all" || typeToCheck === filterType;
      return matchName && matchType;
    });

    return result.sort((a, b) => {
      switch (sortType) {
        case "newest":
          return new Date(b.release_date).getTime() - new Date(a.release_date).getTime();
        case "oldest":
          return new Date(a.release_date).getTime() - new Date(b.release_date).getTime();
        case "most_tracks":
          return getTrackCount(b.id) - getTrackCount(a.id);
        case "least_tracks":
          return getTrackCount(a.id) - getTrackCount(b.id);
        default:
          return 0;
      }
    });
  }, [albums, songs, searchTerm, filterType, sortType]);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentAlbums = processedAlbums.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(processedAlbums.length / itemsPerPage);

  const getSortLabel = () => {
    switch (sortType) {
      case "newest": return "Latest";
      case "oldest": return "Oldest";
      case "most_tracks": return "Most songs";
      case "least_tracks": return "Fewest songs";
    }
  };

  return (
    <ArtistLayout>
      <div
        className="max-w-7xl mx-auto flex flex-col gap-6"
        onClick={() => {
          if (isFilterOpen) setIsFilterOpen(false);
          if (isSortOpen) setIsSortOpen(false);
        }}
      >
        <div className="flex flex-col md:flex-row justify-between items-end gap-4">
          <div>
            <h2 className="text-3xl font-bold text-white mb-2">Album Management</h2>
            <p className="text-gray-400">Set the permission status (Premium/Free) for your albums.</p>
          </div>
          <button
            onClick={handleOpenAdd}
            className="flex items-center gap-2 bg-[#8c2bee] hover:bg-[#7b24d3] text-white px-5 py-2.5 rounded-xl font-bold transition-all shadow-lg shadow-purple-900/20 active:scale-95"
          >
            <Plus size={20} /> Add new album
          </button>
        </div>

        {/* Filter Bar */}
        <div className="bg-[#2a2136] p-4 rounded-xl border border-[#3c314b] flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Search for albums by name..."
              className="w-full pl-10 pr-4 py-2.5 bg-[#191022] border border-[#3c314b] rounded-lg text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-[#8c2bee]/50 transition-all"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="flex gap-3">
            {/* Filter Dropdown */}
            <div className="relative">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setIsFilterOpen(!isFilterOpen);
                  setIsSortOpen(false);
                }}
                className={`px-4 py-2.5 bg-[#191022] border border-[#3c314b] rounded-lg text-gray-300 font-medium flex items-center gap-2 hover:bg-[#3c314b] transition-colors min-w-35 justify-between ${isFilterOpen ? "ring-2 ring-[#8c2bee]/50 border-transparent" : ""}`}
              >
                <span className="text-sm">{filterType === "all" ? "All types" : filterType}</span>
                <ChevronDown size={16} className="text-gray-500" />
              </button>

              {isFilterOpen && (
                <div className="absolute top-full right-0 mt-2 w-48 bg-[#191022] border border-[#3c314b] rounded-xl shadow-xl z-50 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
                  <div className="py-1">
                    {["all", "FREE", "PREMIUM"].map((type) => (
                      <button
                        key={type}
                        onClick={() => setFilterType(type as FilterType)}
                        className="w-full px-4 py-2.5 text-left text-sm text-gray-300 hover:bg-[#8c2bee] hover:text-white flex items-center justify-between group"
                      >
                        <span className="flex items-center gap-2">
                          {type === "PREMIUM" && <Crown size={14} className="text-yellow-500 group-hover:text-white" />}
                          {type === "FREE" && <Unlock size={14} className="text-emerald-500 group-hover:text-white" />}
                          {type === "all" ? "ALL" : type}
                        </span>
                        {filterType === type && <Check size={16} />}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Sort Dropdown */}
            <div className="relative">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setIsSortOpen(!isSortOpen);
                  setIsFilterOpen(false);
                }}
                className={`px-4 py-2.5 bg-[#191022] border border-[#3c314b] rounded-lg text-gray-300 font-medium flex items-center gap-2 hover:bg-[#3c314b] transition-colors min-w-40 justify-between ${isSortOpen ? "ring-2 ring-[#8c2bee]/50 border-transparent" : ""}`}
              >
                <div className="flex items-center gap-2">
                  <ArrowUpDown size={16} />
                  <span className="text-sm">{getSortLabel()}</span>
                </div>
                <ChevronDown size={16} className="text-gray-500" />
              </button>

              {isSortOpen && (
                <div className="absolute top-full right-0 mt-2 w-52 bg-[#191022] border border-[#3c314b] rounded-xl shadow-xl z-50 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
                  <div className="py-1">
                    <button onClick={() => setSortType("newest")} className="w-full px-4 py-2.5 text-left text-sm text-gray-300 hover:bg-[#8c2bee] hover:text-white flex items-center justify-between group">
                      <span className="flex items-center gap-2"><Calendar size={14} /> Latest</span>
                      {sortType === "newest" && <Check size={16} />}
                    </button>
                    <button onClick={() => setSortType("oldest")} className="w-full px-4 py-2.5 text-left text-sm text-gray-300 hover:bg-[#8c2bee] hover:text-white flex items-center justify-between group">
                      <span className="flex items-center gap-2"><Calendar size={14} /> Oldest</span>
                      {sortType === "oldest" && <Check size={16} />}
                    </button>
                    <div className="h-px bg-[#3c314b] my-1"></div>
                    <button onClick={() => setSortType("most_tracks")} className="w-full px-4 py-2.5 text-left text-sm text-gray-300 hover:bg-[#8c2bee] hover:text-white flex items-center justify-between group">
                      <span className="flex items-center gap-2"><Layers size={14} /> Most songs</span>
                      {sortType === "most_tracks" && <Check size={16} />}
                    </button>
                    <button onClick={() => setSortType("least_tracks")} className="w-full px-4 py-2.5 text-left text-sm text-gray-300 hover:bg-[#8c2bee] hover:text-white flex items-center justify-between group">
                      <span className="flex items-center gap-2"><Layers size={14} /> Fewest songs</span>
                      {sortType === "least_tracks" && <Check size={16} />}
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="bg-[#2a2136] rounded-xl border border-[#3c314b] overflow-hidden shadow-sm flex flex-col min-h-125">
          {albumLoading ? (
            <div className="flex-1 flex items-center justify-center text-gray-400 animate-pulse">Loading Album data...</div>
          ) : processedAlbums.length === 0 ? (
            <div className="flex-1 flex flex-col items-center justify-center text-gray-400 gap-3">
              <Disc size={40} className="text-gray-600" />
              <p>No albums found.</p>
            </div>
          ) : (
            <>
              <div className="overflow-x-auto flex-1">
                <table className="w-full text-left border-collapse">
                  <thead className="bg-[#221a2c] text-xs uppercase font-bold text-gray-500 border-b border-[#3c314b]">
                    <tr>
                      <th className="px-6 py-4 w-20">ID</th>
                      <th className="px-6 py-4 w-24">Cover image</th>
                      <th className="px-6 py-4">Title</th>
                      <th className="px-6 py-4">Release date</th>
                      <th className="px-6 py-4">Type (Access)</th>
                      <th className="px-6 py-4 text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#3c314b] text-sm">
                    {currentAlbums.map((album, index) => {
                      const trackCount = getTrackCount(album.id);
                      const albumType = album.type || "FREE";
                      return (
                        <tr key={album.id} className="group hover:bg-[#3c314b]/40 transition-colors">
                          <td className="px-6 py-4 text-gray-500 font-mono">#ALB{String(album.id).padStart(3, "0")}</td>
                          <td className="px-6 py-4">
                            <div className="w-14 h-14 rounded-lg overflow-hidden border border-[#3c314b]">
                              <img src={album.cover_image || "https://placehold.co/100x100/2a2136/FFF?text=No+Cover"} alt={album.title} className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500" />
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex flex-col">
                              <span className="font-bold text-white text-base mb-1 group-hover:text-[#8c2bee] transition-colors">{album.title}</span>
                              <span className="text-xs text-gray-500 flex items-center gap-1"><Layers size={12} /> {trackCount} tracks</span>
                            </div>
                          </td>
                          <td className="px-6 py-4 text-gray-400">
                            <div className="flex items-center gap-2"><Calendar size={14} />{new Date(album.release_date).toLocaleDateString("vi-VN")}</div>
                          </td>
                          <td className="px-6 py-4">
                            <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold border ${getTypeBadgeColor(albumType)}`}>
                              {getTypeIcon(albumType)}{albumType}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-right">
                            <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                              <button onClick={() => handleOpenEdit(album)} className="p-2 hover:bg-[#8c2bee] hover:text-white rounded-lg text-gray-400 transition-colors" title="Sửa"><Edit size={16} /></button>
                              <button onClick={() => handleDelete(album.id)} className="p-2 hover:bg-red-500/10 hover:text-red-500 rounded-lg text-gray-400 transition-colors" title="Xóa"><Trash2 size={16} /></button>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              <div className="px-6 py-4 border-t border-[#3c314b] flex flex-col sm:flex-row justify-between items-center gap-4 bg-[#2a2136]">
                <span className="text-xs text-gray-500 font-medium">Show {indexOfFirstItem + 1} to {Math.min(indexOfLastItem, processedAlbums.length)} among {processedAlbums.length} albums</span>
                <div className="flex gap-2">
                  <button onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 1} className="px-3 py-1.5 rounded-lg border border-[#3c314b] text-gray-300 text-xs font-bold hover:bg-white/5 disabled:opacity-30">Previous</button>
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((number) => (
                    <button key={number} onClick={() => setCurrentPage(number)} className={`w-8 h-8 rounded-lg text-xs font-bold ${currentPage === number ? "bg-[#8c2bee] text-white" : "border border-[#3c314b] text-gray-400"}`}>{number}</button>
                  ))}
                  <button onClick={() => setCurrentPage(currentPage + 1)} disabled={currentPage === totalPages} className="px-3 py-1.5 rounded-lg border border-[#3c314b] text-gray-300 text-xs font-bold hover:bg-white/5 disabled:opacity-30">Next</button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>

      <AddAlbumModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveAlbum}
        artistId={currentArtistId}
        initialData={editingAlbum}
      />
    </ArtistLayout>
  );
};

export default AlbumManagement;