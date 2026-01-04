import React, { useState } from 'react';

interface Subscription {
  id: number;
  name: string;
  price: number;
  duration: string;
}

const mockSubscriptions: Subscription[] = [
  { id: 1, name: 'Premium', price: 99000, duration: '1 month' },
  { id: 2, name: 'Premium Plus', price: 199000, duration: '1 month' },
  { id: 3, name: 'Premium Yearly', price: 999000, duration: '1 year' },
];

const AdminSubscription: React.FC = () => {
  const [subscriptions, setSubscriptions] = useState<Subscription[]>(mockSubscriptions);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentSubscription, setCurrentSubscription] = useState<Subscription | null>(null);
  const [formState, setFormState] = useState({ name: '', price: '', duration: '' });

  const handleAdd = () => {
    setCurrentSubscription(null);
    setFormState({ name: '', price: '', duration: '' });
    setIsModalOpen(true);
  };

  const handleEdit = (subscription: Subscription) => {
    setCurrentSubscription(subscription);
    setFormState({ name: subscription.name, price: String(subscription.price), duration: subscription.duration });
    setIsModalOpen(true);
  };

  const handleDelete = (subscriptionId: number) => {
    if (window.confirm('Are you sure you want to delete this subscription?')) {
      setSubscriptions(subscriptions.filter(sub => sub.id !== subscriptionId));
    }
  };

  const handleSave = () => {
    const { name, price, duration } = formState;
    if (!name || !price || !duration) {
      setError('All fields are required');
      return;
    }

    if (currentSubscription) {
      setSubscriptions(subscriptions.map(sub =>
        sub.id === currentSubscription.id ? { ...sub, name, price: Number(price), duration } : sub
      ));
    } else {
      const newId = subscriptions.length > 0 ? Math.max(...subscriptions.map(s => s.id)) + 1 : 1;
      setSubscriptions([...subscriptions, { id: newId, name, price: Number(price), duration }]);
    }
    setIsModalOpen(false);
    setError(null);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Subscription Management</h1>
      <div className="flex justify-end mb-4">
        <button onClick={handleAdd} className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
          Add Subscription
        </button>
      </div>
      {error && <p className="text-red-500 bg-red-100 p-3 rounded mb-4">{error}</p>}
      <table className="min-w-full bg-white rounded-lg shadow">
        <thead>
          <tr className="w-full h-16 border-gray-300 border-b py-8">
            <th className="text-left px-6">ID</th>
            <th className="text-left px-6">Name</th>
            <th className="text-left px-6">Price (VND)</th>
            <th className="text-left px-6">Duration</th>
            <th className="text-left px-6">Actions</th>
          </tr>
        </thead>
        <tbody>
          {subscriptions.map(sub => (
            <tr key={sub.id} className="h-12 border-gray-300 border-b">
              <td className="px-6">{sub.id}</td>
              <td className="px-6">{sub.name}</td>
              <td className="px-6">{sub.price.toLocaleString()}</td>
              <td className="px-6">{sub.duration}</td>
              <td className="px-6">
                <button onClick={() => handleEdit(sub)} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 mr-2">
                  Edit
                </button>
                <button onClick={() => handleDelete(sub.id)} className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center">
          <div className="bg-white p-8 rounded-lg shadow-xl w-1/3">
            <h2 className="text-xl font-bold mb-4">{currentSubscription ? 'Edit Subscription' : 'Add Subscription'}</h2>
            <input
              type="text"
              name="name"
              value={formState.name}
              onChange={handleChange}
              className="w-full p-2 border rounded mb-4"
              placeholder="Subscription name"
            />
            <input
              type="number"
              name="price"
              value={formState.price}
              onChange={handleChange}
              className="w-full p-2 border rounded mb-4"
              placeholder="Price (VND)"
            />
            <input
              type="text"
              name="duration"
              value={formState.duration}
              onChange={handleChange}
              className="w-full p-2 border rounded mb-4"
              placeholder="Duration (e.g., 1 month)"
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

export default AdminSubscription;
