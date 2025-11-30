import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import DropModel from '@/models/Drop';
import { ApiResponse, Drop } from '@/types';

// GET: Fetch all drops or drops near a location
export async function GET(request: NextRequest) {
  try {
    await connectToDatabase();

    const searchParams = request.nextUrl.searchParams;
    const latitude = searchParams.get('latitude');
    const longitude = searchParams.get('longitude');
    const radius = searchParams.get('radius') || '5000'; // Default 5km

    let drops: Drop[];

    if (latitude && longitude) {
      // Find drops within radius
      const lat = parseFloat(latitude);
      const lon = parseFloat(longitude);
      const maxDistance = parseInt(radius);

      drops = await DropModel.find({
        location: {
          $near: {
            $geometry: {
              type: 'Point',
              coordinates: [lon, lat],
            },
            $maxDistance: maxDistance,
          },
        },
      }).sort({ createdAt: -1 });
    } else {
      // Return all drops
      drops = await DropModel.find().sort({ createdAt: -1 }).limit(100);
    }

    const response: ApiResponse<Drop[]> = {
      success: true,
      data: drops,
    };

    return NextResponse.json(response);
  } catch (error) {
    console.error('Error fetching drops:', error);
    const response: ApiResponse = {
      success: false,
      error: 'Failed to fetch drops',
    };
    return NextResponse.json(response, { status: 500 });
  }
}

// POST: Create a new drop
export async function POST(request: NextRequest) {
  try {
    await connectToDatabase();

    const body = await request.json();
    const { latitude, longitude, amount, message, createdBy, transactionHash } = body;

    // Validation
    if (!latitude || !longitude || !amount || !message || !createdBy) {
      const response: ApiResponse = {
        success: false,
        error: 'Missing required fields',
      };
      return NextResponse.json(response, { status: 400 });
    }

    if (amount < 0.1) {
      const response: ApiResponse = {
        success: false,
        error: 'Amount must be at least 0.1 XLM',
      };
      return NextResponse.json(response, { status: 400 });
    }

    // Note: The smart contract interaction happens on the client side via Freighter
    // The transactionHash should be provided by the client after successful contract call
    // This API only stores the drop metadata in the database
    
    if (!transactionHash) {
      const response: ApiResponse = {
        success: false,
        error: 'Transaction hash required. Drop must be created on-chain first.',
      };
      return NextResponse.json(response, { status: 400 });
    }

    // Create drop in database (metadata only, funds are held by smart contract)
    const drop = await DropModel.create({
      location: {
        type: 'Point',
        coordinates: [longitude, latitude],
      },
      amount,
      message,
      createdBy,
      transactionHash,
      claimed: false,
    });

    const response: ApiResponse<Drop> = {
      success: true,
      data: drop,
      message: 'Drop created successfully',
    };

    return NextResponse.json(response, { status: 201 });
  } catch (error) {
    console.error('Error creating drop:', error);
    const response: ApiResponse = {
      success: false,
      error: 'Failed to create drop',
    };
    return NextResponse.json(response, { status: 500 });
  }
}

