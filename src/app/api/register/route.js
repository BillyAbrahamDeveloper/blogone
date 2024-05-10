// http:localhost:3000/api/register

import db from '@/lib/db';
import bcrypt from 'bcrypt';
import User from '@/models/User';

export async function POST(req) {
  try {
    await db.connectDB();

    const { username, email, password: pass } = await req.json();
    const isExisting = await User.findOne({ email });
    if (isExisting) {
      throw new Error('User already created');
    }

    const hashedPassword = await bcrypt.hash(pass, 10);
    const newUser = await User.create({
      username,
      email,
      password: hashedPassword,
    });

    const { password, ...user } = newUser._doc;

    console.log(user._doc);

    return new Response(JSON.stringify(user), { status: 201 });
  } catch (error) {
    return new Response(JSON.stringify(error.message), { status: 500 });
  }
}
