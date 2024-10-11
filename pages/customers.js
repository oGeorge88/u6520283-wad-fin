// pages/customers.js
import React, { useEffect, useState } from 'react';

const Customers = () => {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const res = await fetch('/api/customers');
        if (!res.ok) {
          throw new Error('Failed to fetch customers');
        }
        const data = await res.json();
        setCustomers(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCustomers();
  }, []);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this customer?');
    if (confirmDelete) {
      try {
        const response = await fetch(`/api/customers/${id}`, { method: 'DELETE' });
        if (!response.ok) {
          throw new Error('Failed to delete customer');
        }
        setCustomers(customers.filter((customer) => customer._id !== id));
      } catch (err) {
        setError(err.message);
      }
    }
  };

  if (loading) return <div className="text-center">Loading...</div>;
  if (error) return <div className="text-red-500 text-center">Error: {error}</div>;

  return (
    <div>
      <h1 className="font-bold text-2xl mb-4">Customers</h1>
      {customers.length === 0 ? (
        <p>No customers found.</p>
      ) : (
        <ul>
          {customers.map((customer) => (
            <li key={customer._id} className="flex justify-between items-center mb-2">
              <span>
                {customer.name} - {customer.interests}
              </span>
              <button
                onClick={() => handleDelete(customer._id)}
                className="bg-red-500 text-white px-2 py-1 rounded"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Customers;
