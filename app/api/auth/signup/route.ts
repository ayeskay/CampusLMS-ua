import { type NextRequest, NextResponse } from "next/server"
import { createServerClient } from "@supabase/ssr"

export async function POST(request: NextRequest) {
  try {
    const { fullName, email, password, studentId, useCustomId, customUserId } = await request.json()

    // Validation
    if (!fullName || !email || !password) {
      return NextResponse.json({ message: "Missing required fields" }, { status: 400 })
    }

    const supabase = createServerClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!, {
      cookies: {
        getAll() {
          return []
        },
        setAll() {},
      },
    })

    const { data: authData, error: authError } = await supabase.auth.admin.createUser({
      email,
      password,
      email_confirm: true,
    })

    if (authError) {
      return NextResponse.json({ message: authError.message }, { status: 400 })
    }

    const finalUserId = useCustomId && customUserId ? customUserId : authData.user.id
    const { error: profileError } = await supabase.from("users").insert({
      id: finalUserId,
      auth_id: authData.user.id,
      full_name: fullName,
      email,
      student_id: studentId || "",
      role: "student",
      created_at: new Date().toISOString(),
    })

    if (profileError) {
      return NextResponse.json({ message: "Failed to create user profile" }, { status: 400 })
    }

    return NextResponse.json(
      {
        message: "Account created successfully",
        user: {
          id: finalUserId,
          email,
          fullName,
          role: "student",
        },
      },
      { status: 201 },
    )
  } catch (error) {
    console.error("Signup error:", error)
    return NextResponse.json({ message: "Signup failed" }, { status: 500 })
  }
}
