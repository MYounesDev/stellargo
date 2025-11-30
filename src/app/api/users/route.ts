import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import UserModel from '@/models/User';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { publicKey, persona, username, bio } = body;

    if (!publicKey || !persona) {
      return NextResponse.json(
        { success: false, error: 'Public key and persona are required' },
        { status: 400 }
      );
    }

    await connectToDatabase();

    // Check if user already exists
    const existingUser = await UserModel.findOne({ publicKey });
    if (existingUser) {
      return NextResponse.json(
        { success: false, error: 'User already exists' },
        { status: 409 }
      );
    }

    // Create new user
    const user = await UserModel.create({
      publicKey,
      persona,
      username: username || null,
      bio: bio || null,
      level: 1,
      totalDropsCreated: 0,
      totalDropsClaimed: 0,
      totalAmountSent: 0,
      totalAmountReceived: 0,
    });

    return NextResponse.json({
      success: true,
      data: user,
    });
  } catch (error: any) {
    console.error('User creation error:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to create user' },
      { status: 500 }
    );
  }
}

