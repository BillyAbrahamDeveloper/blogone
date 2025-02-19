import db from '@/lib/db';
import { verifyJwtToken } from '@/lib/jwt';
import Blog from '@/models/Blog';

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
    const blog = await Blog.findById(id);

    if (blog.likes.includes(decodedToken._id)) {
      blog.likes = blog.likes.filter(
        (id) => id.toString() !== decodedToken.id.toString()
      );
    } else {
      blog.likes.push(decodedToken._id);
    }

    await blog.save();

    return new Response(JSON.stringify({ message: 'successfully liked ' }), {
      status: 200,
    });
  } catch (error) {
    return new Response(JSON.stringify(null), { status: 500 });
  }
}
