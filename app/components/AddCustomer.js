import { useState } from 'react';

export default function AddCustomer({ onAddCustomer }) {
  const [name, setName] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [memberNumber, setMemberNumber] = useState('');
  const [interests, setInterests] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const customer = { name, dateOfBirth, memberNumber, interests };

    const res = await fetch('/api/customers', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(customer),
    });

    if (res.ok) {
      const newCustomer = await res.json();
      onAddCustomer(newCustomer);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" required />
      <input type="date" value={dateOfBirth} onChange={(e) => setDateOfBirth(e.target.value)} required />
      <input type="number" value={memberNumber} onChange={(e) => setMemberNumber(e.target.value)} placeholder="Member Number" required />
      <input type="text" value={interests} onChange={(e) => setInterests(e.target.value)} placeholder="Interests" required />
      <button type="submit">Add Customer</button>
    </form>
  );
}
