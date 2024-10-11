import dbConnect from "@/lib/dbConnect"; // Ensure you connect to the database
import Category from "@/models/Category";

export async function GET(req, res) {
  await dbConnect();
  
  try {
    const categories = await Category.find().sort({ order: -1 });
    return new Response(JSON.stringify(categories), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Failed to fetch categories' }), { status: 500 });
  }
}

export async function POST(req, res) {
  await dbConnect();
  const body = await req.json();

  try {
    const category = new Category(body);
    await category.save();
    return new Response(JSON.stringify(category), { status: 201 });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Failed to add category' }), { status: 500 });
  }
}

export async function PUT(req, res) {
  await dbConnect();
  const body = await req.json();

  try {
    const category = await Category.findByIdAndUpdate(body._id, body, { new: true });
    return new Response(JSON.stringify(category), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Failed to update category' }), { status: 500 });
  }
}
