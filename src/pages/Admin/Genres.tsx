import React, { useEffect, useState, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store';
import { fetchGenres, addGenreAsync, updateGenreAsync, deleteGenreAsync } from '../../store/slices/adminGenreSlice';
import { Genre } from '../../types/music.types';

const AdminGenre: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const { genres, loading, error } = useSelector((state: RootState) => state.adminGenre);

  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const genresPerPage = 10;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentGenre, setCurrentGenre] = useState<Genre | null>(null);
  const [newGenreName, setNewGenreName] = useState('');

  useEffect(() => {
    dispatch(fetchGenres());
  }, [dispatch]);

  const handleAdd = () => {
    setCurrentGenre(null);
    setNewGenreName('');
    setIsModalOpen(true);
  };

  const handleEdit = (genre: Genre) => {
    setCurrentGenre(genre);
    setNewGenreName(genre.genre_name);
    setIsModalOpen(true);
  };

  const handleDelete = (genreId: string) => {
    if (window.confirm('Are you sure you want to delete this genre?')) {
      dispatch(deleteGenreAsync(genreId));
    }
  };

  const handleSave = () => {
    if (currentGenre) {
      dispatch(updateGenreAsync({ id: currentGenre.id, payload: { ...currentGenre, genre_name: newGenreName } }));
    } else {
      dispatch(addGenreAsync({ genre_name: newGenreName }));
    }
    setIsModalOpen(false);
  };

  const filteredGenres = useMemo(() => {
    return genres.filter(genre =>
      genre.genre_name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [genres, searchTerm]);

  const indexOfLastGenre = currentPage * genresPerPage;
  const indexOfFirstGenre = indexOfLastGenre - genresPerPage;
  const currentGenres = filteredGenres.slice(indexOfFirstGenre, indexOfLastGenre);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Genre Management</h1>
      <div className="flex justify-between mb-4">
        <input
          type="text"
          placeholder="Search by name..."
          className="p-2 border rounded"
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button onClick={handleAdd} className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
          Add Genre
        </button>
      </div>
      <table className="min-w-full bg-white rounded-lg shadow">
        <thead>
          <tr className="w-full h-16 border-gray-300 border-b py-8">
            <th className="text-left px-6">ID</th>
            <th className="text-left px-6">Name</th>
            <th className="text-left px-6">Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentGenres.map(genre => (
            <tr key={genre.id} className="h-12 border-gray-300 border-b">
              <td className="px-6">{genre.id}</td>
              <td className="px-6">{genre.genre_name}</td>
              <td className="px-6">
                <button onClick={() => handleEdit(genre)} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 mr-2">
                  Edit
                </button>
                <button onClick={() => handleDelete(genre.id)} className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex justify-center mt-4">
        {Array.from({ length: Math.ceil(filteredGenres.length / genresPerPage) }, (_, i) => (
          <button
            key={i + 1}
            onClick={() => paginate(i + 1)}
            className={`px-4 py-2 mx-1 rounded ${currentPage === i + 1 ? 'bg-gray-800 text-white' : 'bg-gray-300'}`}
          >
            {i + 1}
          </button>
        ))}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center">
          <div className="bg-white p-8 rounded-lg shadow-xl">
            <h2 className="text-xl font-bold mb-4">{currentGenre ? 'Edit Genre' : 'Add Genre'}</h2>
            <input
              type="text"
              value={newGenreName}
              onChange={(e) => setNewGenreName(e.target.value)}
              className="w-full p-2 border rounded mb-4"
              placeholder="Genre name"
            />
            <div className="flex justify-end">
              <button onClick={() => setIsModalOpen(false)} className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400 mr-2">
                Cancel
              </button>
              <button onClick={handleSave} className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminGenre;
