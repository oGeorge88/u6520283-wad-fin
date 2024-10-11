import dbConnect from "@/lib/dbConnect"; // Ensure database connection
import Product from "@/models/Product";

export async function GET(request, { params }) {
  await dbConnect(); // Connect to the database
  const id = params.id;

  try {
    const product = await Product.findById(id).populate("category");
    if (!product) {
      return new Response(JSON.stringify({ error: 'Product not found' }), { status: 404 });
    }
    console.log({ product });
    return new Response(JSON.stringify(product), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Failed to fetch product' }), { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  await dbConnect(); // Connect to the database
  const id = params.id;

  try {
    const deletedProduct = await Product.findByIdAndDelete(id);
    if (!deletedProduct) {
      return new Response(JSON.stringify({ error: 'Product not found' }), { status: 404 });
    }
    return new Response(JSON.stringify({ message: 'Product deleted successfully' }), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Failed to delete product' }), { status: 500 });
  }
}
