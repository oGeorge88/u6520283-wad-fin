import dbConnect from "@/lib/dbConnect"; // Ensure you connect to the database
import Product from "@/models/Product";

export async function GET(req, res) {
  await dbConnect();

  try {
    const products = await Product.find();
    return new Response(JSON.stringify(products), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Failed to fetch products' }), { status: 500 });
  }
}

export async function POST(request) {
  await dbConnect(); // Connect to the database
  const body = await request.json();
  console.log(body);

  try {
    const product = new Product(body);
    await product.save();
    return new Response(JSON.stringify(product), { status: 201 });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Failed to add product' }), { status: 500 });
  }
}

export async function PUT(request) {
  await dbConnect(); // Connect to the database
  const body = await request.json();
  const { _id, ...updateData } = body;

  try {
    const product = await Product.findByIdAndUpdate(_id, updateData, { new: true });
    if (!product) {
      return new Response("Product not found", { status: 404 });
    }
    return new Response(JSON.stringify(product), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Failed to update product' }), { status: 500 });
  }
}

export async function PATCH(request) {
  await dbConnect(); // Connect to the database
  const body = await request.json();
  const { _id, ...updateData } = body;

  try {
    const product = await Product.findByIdAndUpdate(_id, updateData, { new: true });
    if (!product) {
      return new Response("Product not found", { status: 404 });
    }
    return new Response(JSON.stringify(product), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Failed to update product' }), { status: 500 });
  }
}
