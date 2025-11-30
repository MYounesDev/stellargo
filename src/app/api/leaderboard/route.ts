import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import UserModel from '@/models/User';

export async function GET() {
  try {
    await connectToDatabase();

    // Get top users by total drops created
    const topUsers = await UserModel
      .find()
      .sort({ totalDropsCreated: -1, totalAmountSent: -1 })
      .limit(10)
      .select('publicKey username persona totalDropsCreated totalAmountSent level badge');

    return NextResponse.json({
      success: true,
      data: topUsers,
    });
  } catch (error: any) {
    console.error('Leaderboard error:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to fetch leaderboard' },
      { status: 500 }
    );
  }
}

