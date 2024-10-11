// app/components/CustomerList.js
"use client"; // This is a client component

import React, { useEffect, useState } from 'react';

export default function CustomerList() {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchCustomers() {
      try {
        const response = await fetch('/api/customers');
        if (!response.ok) {
          throw new Error('Failed to fetch customers');
        }
        const data = await response.json();
        setCustomers(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchCustomers();
  }, []);

  if (loading) return <div className="text-center">Loading...</div>;
  if (error) return <div className="text-red-500 text-center">Error: {error}</div>;
  if (customers.length === 0) return <div className="text-center">No customers found.</div>;

  return (
    <div>
      <h2 className="font-bold text-2xl mb-4">Customer List</h2>
      <ul className="list-disc pl-5">
        {customers.map(customer => (
          <li key={customer._id}>
            <strong>{customer.name}</strong> - Member Number: {customer.memberNumber} - Interests: {customer.interests}
          </li>
        ))}
      </ul>
    </div>
  );
}
