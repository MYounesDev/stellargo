import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import DropModel from '@/models/Drop';
import { ApiResponse, Drop } from '@/types';
import { isWithinRange } from '@/lib/stellar';

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await dbConnect();

    const body = await request.json();
    const { userPublicKey, userLatitude, userLongitude, transactionHash } = body;

    // Validation
    if (!userPublicKey || !userLatitude || !userLongitude) {
      const response: ApiResponse = {
        success: false,
        error: 'Missing required fields',
      };
      return NextResponse.json(response, { status: 400 });
    }

    // Find the drop
    const drop = await DropModel.findById(params.id);

    if (!drop) {
      const response: ApiResponse = {
        success: false,
        error: 'Drop not found',
      };
      return NextResponse.json(response, { status: 404 });
    }

    // Check if already claimed
    if (drop.claimed) {
      const response: ApiResponse = {
        success: false,
        error: 'Drop has already been claimed',
      };
      return NextResponse.json(response, { status: 400 });
    }

    // Check if user is within range
    const [dropLongitude, dropLatitude] = drop.location.coordinates;
    const withinRange = isWithinRange(
      userLatitude,
      userLongitude,
      dropLatitude,
      dropLongitude,
      50 // 50 meters
    );

    if (!withinRange) {
      const response: ApiResponse = {
        success: false,
        error: 'You are not within range to claim this drop',
      };
      return NextResponse.json(response, { status: 400 });
    }

    // Update drop as claimed
    drop.claimed = true;
    drop.claimedBy = userPublicKey;
    drop.claimedAt = new Date();
    if (transactionHash) {
      drop.transactionHash = transactionHash;
    }
    await drop.save();

    const response: ApiResponse<Drop> = {
      success: true,
      data: drop,
      message: 'Drop claimed successfully',
    };

    return NextResponse.json(response);
  } catch (error) {
    console.error('Error claiming drop:', error);
    const response: ApiResponse = {
      success: false,
      error: 'Failed to claim drop',
    };
    return NextResponse.json(response, { status: 500 });
  }
}

