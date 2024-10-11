import dbConnect from "@/lib/dbConnect"; // Ensure to connect to the database
import Category from "@/models/Category";

export async function GET(request, { params }) {
    await dbConnect(); // Connect to the database
    const id = params.id;

    try {
        const category = await Category.findById(id);
        if (!category) {
            return new Response(JSON.stringify({ error: 'Category not found' }), { status: 404 });
        }
        return new Response(JSON.stringify(category), { status: 200 });
    } catch (error) {
        return new Response(JSON.stringify({ error: 'Failed to fetch category' }), { status: 500 });
    }
}

export async function DELETE(request, { params }) {
    await dbConnect(); // Connect to the database
    const id = params.id;

    try {
        const category = await Category.findByIdAndDelete(id);
        if (!category) {
            return new Response(JSON.stringify({ error: 'Category not found' }), { status: 404 });
        }
        return new Response(JSON.stringify({ message: 'Category deleted successfully' }), { status: 200 });
    } catch (error) {
        return new Response(JSON.stringify({ error: 'Failed to delete category' }), { status: 500 });
    }
}
