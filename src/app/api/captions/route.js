import { verifyToken } from '@/lib/auth'
import connectDB from '@/lib/mongodb'
import Caption from '@/models/Caption'
import User from '@/models/User'
import { NextResponse } from 'next/server'

export async function GET(request) {
  try {
    const decoded = verifyToken(request)
    
    if (!decoded) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    await connectDB()
    const user = await User.findById(decoded.userId)

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    const captions = await Caption.find({ userId: user._id })
      .sort({ createdAt: -1 })
      .limit(50)

    return NextResponse.json({ success: true, captions })
  } catch (error) {
    console.error('Error fetching captions:', error)
    return NextResponse.json(
      { error: 'Failed to fetch captions' },
      { status: 500 }
    )
  }
}