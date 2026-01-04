import React, { useEffect, useState, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store';
import { fetchSongs, deleteSongAsync } from '../../store/slices/adminSongSlice';
import { fetchUsers } from '../../store/slices/adminUserSlice';
import { fetchAlbums } from '../../store/slices/adminAlbumSlice';

const AdminSong: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const { songs, loading: songsLoading, error: songsError } = useSelector((state: RootState) => state.adminSong);
  const { users, loading: usersLoading, error: usersError } = useSelector((state: RootState) => state.adminUser);
  const { albums, loading: albumsLoading, error: albumsError } = useSelector((state: RootState) => state.adminAlbum);

  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const songsPerPage = 10;

  useEffect(() => {
    dispatch(fetchSongs());
    dispatch(fetchUsers());
    dispatch(fetchAlbums());
  }, [dispatch]);

  const handleDelete = (songId: number) => {
    if (window.confirm('Are you sure you want to delete this song?')) {
      dispatch(deleteSongAsync(songId));
    }
  };

  const getArtistName = (artistId: number | null | undefined) => {
    if(!artistId) return 'N/A';
    const artist = users.find(user => user.id === artistId);
    return artist ? `${artist.first_name} ${artist.last_name}` : `Artist ID: ${artistId}`;
  };

  const getAlbumTitle = (albumId: number | null | undefined) => {
    if (!albumId) return 'N/A';
    const album = albums.find(album => album.id === albumId);
    return album ? album.title : `Album ID: ${albumId}`;
  };

  const filteredSongs = useMemo(() => {
    return songs.filter(song =>
      song.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [songs, searchTerm]);

  const indexOfLastSong = currentPage * songsPerPage;
  const indexOfFirstSong = indexOfLastSong - songsPerPage;
  const currentSongs = filteredSongs.slice(indexOfFirstSong, indexOfLastSong);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  if (songsLoading || usersLoading || albumsLoading) {
    return <p>Loading...</p>;
  }

  if (songsError || usersError || albumsError) {
    return <p>Error: {songsError || usersError || albumsError}</p>;
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Song Management</h1>
      <input
        type="text"
        placeholder="Search by title..."
        className="mb-4 p-2 border rounded"
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <table className="min-w-full bg-white rounded-lg shadow">
        <thead>
          <tr className="w-full h-16 border-gray-300 border-b py-8">
            <th className="text-left px-6">ID</th>
            <th className="text-left px-6">Title</th>
            <th className="text-left px-6">Artist</th>
            <th className="text-left px-6">Album</th>
            <th className="text-left px-6">Views</th>
            <th className="text-left px-6">Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentSongs.map(song => (
            <tr key={song.id} className="h-12 border-gray-300 border-b">
              <td className="px-6">{song.id}</td>
              <td className="px-6">{song.title}</td>
              <td className="px-6">{getArtistName(song.artist_id)}</td>
              <td className="px-6">{getAlbumTitle(song.album_id)}</td>
              <td className="px-6">{song.views?.toLocaleString?.() ?? 0}</td>
              <td className="px-6">
                <button onClick={() => handleDelete(song.id)} className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex justify-center mt-4">
        {Array.from({ length: Math.ceil(filteredSongs.length / songsPerPage) }, (_, i) => (
          <button
            key={i + 1}
            onClick={() => paginate(i + 1)}
            className={`px-4 py-2 mx-1 rounded ${currentPage === i + 1 ? 'bg-gray-800 text-white' : 'bg-gray-300'}`}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default AdminSong;
