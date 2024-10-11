// pages/customers/[id].js
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

const CustomerDetail = () => {
  const router = useRouter();
  const { id } = router.query;
  const [customer, setCustomer] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (id) {
      const fetchCustomer = async () => {
        try {
          const response = await fetch(`/api/customers/${id}`);
          if (!response.ok) {
            throw new Error('Failed to fetch customer data');
          }
          const data = await response.json();
          setCustomer(data);
        } catch (err) {
          setError(err.message);
        } finally {
          setLoading(false);
        }
      };

      fetchCustomer();
    }
  }, [id]);

  if (loading) return <div className="text-center">Loading...</div>;
  if (error) return <div className="text-red-500 text-center">Error: {error}</div>;
  if (!customer) return <div className="text-center">No customer found.</div>;

  return (
    <div className="my-10 mx-10">
      <h1 className="font-bold text-2xl">{customer.name}</h1>
      <p>Date of Birth: {new Date(customer.dateOfBirth).toLocaleDateString()}</p>
      <p>Member Number: {customer.memberNumber}</p>
      <p>Interests: {customer.interests}</p>
    </div>
  );
};

export default CustomerDetail;
