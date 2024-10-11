// pages/customers/[id].js
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

export default function CustomerDetail() {
  const router = useRouter();
  const { id } = router.query;
  const [customer, setCustomer] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchCustomer() {
      if (id) {
        try {
          const res = await fetch(`/api/customers/${id}`);
          if (!res.ok) {
            throw new Error('Failed to fetch customer');
          }
          const data = await res.json();
          setCustomer(data);
        } catch (err) {
          setError(err.message);
        }
      }
    }

    fetchCustomer();
  }, [id]);

  if (error) return <div className="text-red-500">Error: {error}</div>;
  if (!customer) return <div>Loading...</div>;

  return (
    <div>
      <h1 className="font-bold text-2xl">{customer.name}</h1>
      <p>Date of Birth: {new Date(customer.dateOfBirth).toLocaleDateString()}</p>
      <p>Member Number: {customer.memberNumber}</p>
      <p>Interests: {customer.interests}</p>
    </div>
  );
}
