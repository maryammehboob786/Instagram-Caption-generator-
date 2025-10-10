import jwt from 'jsonwebtoken'

export function verifyToken(request) {
  try {
    const authHeader = request.headers.get('authorization')
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return null
    }

    const token = authHeader.substring(7) // Remove 'Bearer ' prefix
    
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET || process.env.NEXTAUTH_SECRET || 'your-secret-key-change-in-production'
    )
    
    return decoded
  } catch (error) {
    console.error('Token verification failed:', error)
    return null
  }
}
