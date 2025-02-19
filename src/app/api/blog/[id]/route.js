import db from '@/lib/db';
import { verifyJwtToken } from '@/lib/jwt';
import Blog from '@/models/Blog';
import User from '@/models/User';

export async function GET(req, ctx) {
  await db.connectDB();

  const id = ctx.params.id;
  console.log(id);
  try {
    const blog = await Blog.findById(id)
      .populate('authorId')
      .select('-password');

    return new Response(JSON.stringify(blog), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify(null), { status: 500 });
  }
}

export async function PUT(req, ctx) {
  await db.connectDB();

  const id = ctx.params.id;
  console.log(id);

  const accessToken = req.headers.get('authorization');
  const token = accessToken.split(' ')[1];

  const decodedToken = verifyJwtToken(token);

  if (!accessToken || !decodedToken) {
    return new Response(
      JSON.stringify({ error: 'Unauthorized token or expired' }),
      { status: 403 }
    );
  }

  try {
    const body = await req.json();

    const blog = await Blog.findById(id).populate('authorId');

    if (blog?.authorId?._id.toString() !== decodedToken._id.toString()) {
      return new Response(
        JSON.stringify({ message: 'Only Author can update this blog' }),
        { status: 403 }
      );
    }

    const updatedBlog = await Blog.findByIdAndUpdate(
      id,
      { $set: { ...body } },
      { new: true }
    );

    return new Response(JSON.stringify(updatedBlog), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify(null), { status: 500 });
  }
}
export async function DELETE(req, ctx) {
  await db.connectDB();

  const id = ctx.params.id;
  console.log(id);

  const accessToken = req.headers.get('authorization');
  const token = accessToken.split(' ')[1];

  const decodedToken = verifyJwtToken(token);

  if (!accessToken || !decodedToken) {
    return new Response(
      JSON.stringify({ error: 'Unauthorized token or expired' }),
      { status: 403 }
    );
  }

  try {
    const blog = await Blog.findById(id).populate('authorId');

    if (blog?.authorId?._id.toString() !== decodedToken._id.toString()) {
      return new Response(
        JSON.stringify({ message: 'Only Author can delete this blog' }),
        { status: 403 }
      );
    }

    await Blog.findByIdAndDelete(id);

    return new Response(JSON.stringify({ message: 'Deleted Successfully' }), {
      status: 200,
    });
  } catch (error) {
    return new Response(JSON.stringify(null), { status: 500 });
  }
}
