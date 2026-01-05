import React, { useEffect, useState, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store';
import { fetchAlbums, deleteAlbumAsync } from '../../store/slices/adminAlbumSlice';
import { fetchUsers } from '../../store/slices/adminUserSlice';

const AdminAlbum: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const { albums, loading: albumsLoading, error: albumsError } = useSelector((state: RootState) => state.adminAlbum);
  const { users, loading: usersLoading, error: usersError } = useSelector((state: RootState) => state.adminUser);

  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const albumsPerPage = 10;

  useEffect(() => {
    dispatch(fetchAlbums());
    dispatch(fetchUsers());
  }, [dispatch]);

  const handleDelete = (albumId: string) => {
    if (window.confirm('Are you sure you want to delete this album?')) {
      dispatch(deleteAlbumAsync(albumId));
    }
  };

  const getArtistName = (artistId: string) => {
    const artist = users.find(user => user.id === artistId);
    return artist ? `${artist.first_name} ${artist.last_name}` : `Artist ID: ${artistId}`;
  };

  const filteredAlbums = useMemo(() => {
    return albums.filter(album =>
      album.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [albums, searchTerm]);

  const indexOfLastAlbum = currentPage * albumsPerPage;
  const indexOfFirstAlbum = indexOfLastAlbum - albumsPerPage;
  const currentAlbums = filteredAlbums.slice(indexOfFirstAlbum, indexOfLastAlbum);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  if (albumsLoading || usersLoading) {
    return <p>Loading...</p>;
  }

  if (albumsError || usersError) {
    return <p>Error: {albumsError || usersError}</p>;
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Album Management</h1>
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
            <th className="text-left px-6">Release Date</th>
            <th className="text-left px-6">Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentAlbums.map(album => (
            <tr key={album.id} className="h-12 border-gray-300 border-b">
              <td className="px-6">{album.id}</td>
              <td className="px-6">{album.title}</td>
              <td className="px-6">{getArtistName(album.artist_id)}</td>
              <td className="px-6">{album.release_date}</td>
              <td className="px-6">
                <button onClick={() => handleDelete(album.id)} className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex justify-center mt-4">
        {Array.from({ length: Math.ceil(filteredAlbums.length / albumsPerPage) }, (_, i) => (
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

export default AdminAlbum;
