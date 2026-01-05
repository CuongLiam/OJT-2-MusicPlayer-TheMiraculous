import React, { useEffect, useState, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store';
import { fetchUsers, updateUserStatusAsync } from '../../store/slices/adminUserSlice';
import { User, UserStatus } from '../../types/auth.types';

const AdminUser: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const { users, loading, error } = useSelector((state: RootState) => state.adminUser);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 10;

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const handleStatusChange = (userId: number, currentStatus: UserStatus) => {
    const newStatus = currentStatus === UserStatus.ACTIVE ? UserStatus.BLOCKED : UserStatus.ACTIVE;
    dispatch(updateUserStatusAsync({ userId, status: newStatus }));
  };

  const filteredUsers = useMemo(() => {
    return users.filter(user =>
      `${user.first_name} ${user.last_name}`.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [users, searchTerm]);

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">User Management</h1>
      <input
        type="text"
        placeholder="Search by name..."
        className="mb-4 p-2 border rounded"
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <table className="min-w-full bg-white rounded-lg shadow">
        <thead>
          <tr className="w-full h-16 border-gray-300 border-b py-8">
            <th className="text-left px-6">ID</th>
            <th className="text-left px-6">Name</th>
            <th className="text-left px-6">Email</th>
            <th className="text-left px-6">Status</th>
            <th className="text-left px-6">Role</th>
            <th className="text-left px-6">Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentUsers.map(user => (
            <tr key={user.id} className="h-12 border-gray-300 border-b">
              <td className="px-6">{user.id}</td>
              <td className="px-6">{user.first_name} {user.last_name}</td>
              <td className="px-6">{user.email}</td>
              <td className="px-6">
                <span className={`px-2 py-1 rounded-full text-xs ${user.status === UserStatus.ACTIVE ? 'bg-green-200 text-green-800' : 'bg-red-200 text-red-800'}`}>
                  {user.status}
                </span>
              </td>
              <td className="px-6">{user.roles.join(', ')}</td>
              <td className="px-6">
                <button
                  onClick={() => handleStatusChange(user.id, user.status)}
                  className={`px-4 py-2 rounded-lg text-white ${user.status === UserStatus.ACTIVE ? 'bg-red-500 hover:bg-red-600' : 'bg-green-500 hover:bg-green-600'}`}
                >
                  {user.status === UserStatus.ACTIVE ? 'Block' : 'Unblock'}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex justify-center mt-4">
        {Array.from({ length: Math.ceil(filteredUsers.length / usersPerPage) }, (_, i) => (
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

export default AdminUser;
