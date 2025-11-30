import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import UserModel from '@/models/User';

export async function GET(
  request: Request,
  { params }: { params: { publicKey: string } }
) {
  try {
    const { publicKey } = params;

    await connectToDatabase();

    const user = await UserModel.findOne({ publicKey });

    if (!user) {
      return NextResponse.json(
        { success: false, error: 'User not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: user,
    });
  } catch (error: any) {
    console.error('User fetch error:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to fetch user' },
      { status: 500 }
    );
  }
}

export async function PATCH(
  request: Request,
  { params }: { params: { publicKey: string } }
) {
  try {
    const { publicKey } = params;
    const body = await request.json();
    const { username, bio } = body;

    await connectToDatabase();

    const user = await UserModel.findOneAndUpdate(
      { publicKey },
      {
        $set: {
          ...(username !== undefined && { username }),
          ...(bio !== undefined && { bio }),
        },
      },
      { new: true }
    );

    if (!user) {
      return NextResponse.json(
        { success: false, error: 'User not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: user,
    });
  } catch (error: any) {
    console.error('User update error:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to update user' },
      { status: 500 }
    );
  }
}

