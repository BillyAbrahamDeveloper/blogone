import db from '@/lib/db';

import { verifyJwtToken } from '@/lib/jwt';
import Comment from '@/models/Comment';

export async function GET(req, ctx) {
  await db.connectDB();

  const id = ctx.params.id;

  try {
    const comments = await Comment.find({ blogId: id }).populate('authorId');

    return new Response(JSON.stringify(comments), { status: 200 });
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
    const comment = await Comment.findById(id).populate('authorId');

    if (comment.authorId._id.toString() !== decodedToken._id.toString()) {
      return new Response(
        JSON.stringify({ message: 'only author can delete this blog' }),
        { status: 401 }
      );
    }

    await Comment.findByIdAndDelete(id);

    return new Response(
      JSON.stringify({ message: 'Successfully deleted comment' }),
      {
        status: 200,
      }
    );
  } catch (error) {
    return new Response(JSON.stringify(null), { status: 500 });
  }
}
