import { type NextRequest, NextResponse } from "next/server"

// Mock user database
const USERS = [
  { id: "1", username: "student1", password: "password123", name: "John Doe", email: "john@example.com" },
  { id: "2", username: "student2", password: "password123", name: "Jane Smith", email: "jane@example.com" },
]

export async function POST(request: NextRequest) {
  try {
    const { username, password } = await request.json()

    if (!username || !password) {
      return NextResponse.json({ message: "Username and password are required" }, { status: 400 })
    }

    const user = USERS.find((u) => u.username === username && u.password === password)

    if (!user) {
      return NextResponse.json({ message: "Invalid username or password" }, { status: 401 })
    }

    // Create a simple token (in production, use JWT)
    const token = Buffer.from(`${user.id}:${Date.now()}`).toString("base64")

    return NextResponse.json({
      token,
      user: {
        id: user.id,
        username: user.username,
        name: user.name,
        email: user.email,
      },
    })
  } catch (error) {
    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  }
}
