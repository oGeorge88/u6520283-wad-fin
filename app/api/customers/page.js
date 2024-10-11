// pages/customers.js
import CustomerList from '@/components/CustomerList';

export default function CustomerPage() {
  return (
    <div>
      <h1 className="font-bold text-2xl mb-4">Customer List</h1>
      <CustomerList />
    </div>
  );
}
