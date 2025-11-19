import { type NextRequest, NextResponse } from "next/server"
import { getSupabaseServer } from "@/lib/supabase/server"

export async function POST(request: NextRequest) {
  try {
    const { fullName, email, password, studentId } = await request.json()

    if (!fullName || !email || !password) {
      return NextResponse.json({ message: "Missing required fields" }, { status: 400 })
    }

    if (password.length < 6) {
      return NextResponse.json({ message: "Password must be at least 6 characters" }, { status: 400 })
    }

    const supabase = await getSupabaseServer()

    const { data: existingUser } = await supabase.from("users").select("id").eq("email", email).single()

    if (existingUser) {
      return NextResponse.json({ message: "User already registered with this email" }, { status: 400 })
    }

    const { data: authData, error: authError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}/auth/callback`,
      },
    })

    if (authError) {
      console.error("[v0] Auth error:", authError)
      return NextResponse.json({ message: authError.message || "Failed to create account" }, { status: 400 })
    }

    if (!authData.user) {
      return NextResponse.json({ message: "Failed to create user" }, { status: 400 })
    }

    const { error: profileError } = await supabase.from("users").insert({
      id: authData.user.id,
      full_name: fullName,
      email,
      student_id: studentId || "",
      role: "student",
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    })

    if (profileError) {
      console.error("[v0] Profile error:", profileError)
      try {
        await supabase.auth.admin.deleteUser(authData.user.id)
      } catch (e) {
        console.error("[v0] Failed to cleanup auth user:", e)
      }
      return NextResponse.json({ message: "Failed to create user profile: " + profileError.message }, { status: 400 })
    }

    return NextResponse.json(
      {
        message: "Account created successfully! You can now log in.",
        user: {
          id: authData.user.id,
          email,
          fullName,
          role: "student",
        },
      },
      { status: 201 },
    )
  } catch (error) {
    console.error("[v0] Signup error:", error)
    return NextResponse.json({ message: "Signup failed. Please try again." }, { status: 500 })
  }
}
