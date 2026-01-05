import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store';
import { fetchBanners, addBannerAsync, deleteBannerAsync } from '../../store/slices/adminBannerSlice';
import { Banner } from '../../types/admin.types';

const AdminBanner: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const { banners, loading, error } = useSelector((state: RootState) => state.adminBanner);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newBannerUrl, setNewBannerUrl] = useState('');
  const [newBannerPosition, setNewBannerPosition] = useState('');

  useEffect(() => {
    dispatch(fetchBanners());
  }, [dispatch]);

  const handleAdd = () => {
    setIsModalOpen(true);
  };

  const handleDelete = (bannerId: number) => {
    if (window.confirm('Are you sure you want to delete this banner?')) {
      dispatch(deleteBannerAsync(bannerId));
    }
  };

  const handleSave = () => {
    dispatch(addBannerAsync({ url: newBannerUrl, position: newBannerPosition }));
    setIsModalOpen(false);
    setNewBannerUrl('');
    setNewBannerPosition('');
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Banner Management</h1>
      <div className="flex justify-end mb-4">
        <button onClick={handleAdd} className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
          Add Banner
        </button>
      </div>
      <table className="min-w-full bg-white rounded-lg shadow">
        <thead>
          <tr className="w-full h-16 border-gray-300 border-b py-8">
            <th className="text-left px-6">ID</th>
            <th className="text-left px-6">URL</th>
            <th className="text-left px-6">Position</th>
            <th className="text-left px-6">Actions</th>
          </tr>
        </thead>
        <tbody>
          {banners.map(banner => (
            <tr key={banner.id} className="h-12 border-gray-300 border-b">
              <td className="px-6">{banner.id}</td>
              <td className="px-6 truncate max-w-sm">{banner.url}</td>
              <td className="px-6">{banner.position}</td>
              <td className="px-6">
                <button onClick={() => handleDelete(banner.id)} className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center">
          <div className="bg-white p-8 rounded-lg shadow-xl">
            <h2 className="text-xl font-bold mb-4">Add Banner</h2>
            <input
              type="text"
              value={newBannerUrl}
              onChange={(e) => setNewBannerUrl(e.target.value)}
              className="w-full p-2 border rounded mb-4"
              placeholder="Banner URL"
            />
            <input
              type="text"
              value={newBannerPosition}
              onChange={(e) => setNewBannerPosition(e.target.value)}
              className="w-full p-2 border rounded mb-4"
              placeholder="Banner Position"
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

export default AdminBanner;
