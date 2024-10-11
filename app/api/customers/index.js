// app/api/customers/index.js
import dbConnect from '@/lib/dbConnect';
import Customer from '@/models/Customer';

export async function GET(req) {
  await dbConnect();
  try {
    const customers = await Customer.find({});
    return new Response(JSON.stringify(customers), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Failed to fetch customers' }), { status: 500 });
  }
}

export async function POST(req) {
  await dbConnect();
  const data = await req.json();
  try {
    const newCustomer = new Customer(data);
    await newCustomer.save();
    return new Response(JSON.stringify(newCustomer), { status: 201 });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Failed to add customer' }), { status: 500 });
  }
}

// Corrected DELETE and PUT methods to use query parameters:
export async function DELETE(req) {
  await dbConnect();
  const { searchParams } = new URL(req.url);
  const id = searchParams.get('id');
  
  try {
    await Customer.findByIdAndDelete(id);
    return new Response(JSON.stringify({ message: 'Customer deleted successfully' }), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Failed to delete customer' }), { status: 500 });
  }
}

export async function PUT(req) {
  await dbConnect();
  const { searchParams } = new URL(req.url);
  const id = searchParams.get('id');
  const data = await req.json();

  try {
    const updatedCustomer = await Customer.findByIdAndUpdate(id, data, { new: true });
    return new Response(JSON.stringify(updatedCustomer), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Failed to update customer' }), { status: 500 });
  }
}
