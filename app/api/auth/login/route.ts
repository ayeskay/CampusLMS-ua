import { type NextRequest, NextResponse } from "next/server"
import { getSupabaseServer } from "@/lib/supabase/server"

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json()

    if (!email || !password) {
      return NextResponse.json({ message: "Email and password are required" }, { status: 400 })
    }

    const supabase = await getSupabaseServer()

    const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (authError || !authData.user) {
      console.error("[v0] Login error:", authError)
      return NextResponse.json({ message: "Invalid email or password" }, { status: 401 })
    }

    const { data: userProfile, error: profileError } = await supabase
      .from("users")
      .select("*")
      .eq("id", authData.user.id)
      .maybeSingle()

    if (profileError) {
      console.error("[v0] Profile query error:", profileError)
      return NextResponse.json({ message: "Error fetching user profile" }, { status: 500 })
    }

    if (!userProfile) {
      console.log("[v0] Creating missing profile for user:", authData.user.id)
      const { error: createError } = await supabase.from("users").insert({
        id: authData.user.id,
        full_name: authData.user.user_metadata?.full_name || "Student",
        email: authData.user.email,
        student_id: "",
        role: "student",
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      })

      if (createError) {
        console.error("[v0] Failed to create profile:", createError)
        return NextResponse.json({ message: "Failed to create user profile" }, { status: 500 })
      }
    }

    const profile = userProfile || {
      id: authData.user.id,
      full_name: authData.user.user_metadata?.full_name || "Student",
      email: authData.user.email,
      student_id: "",
      role: "student",
    }

    const token = authData.session?.access_token || Buffer.from(`${authData.user.id}:${Date.now()}`).toString("base64")

    return NextResponse.json({
      token,
      user: {
        id: profile.id,
        email: profile.email,
        fullName: profile.full_name,
        role: profile.role,
        studentId: profile.student_id,
      },
    })
  } catch (error) {
    console.error("[v0] Login error:", error)
    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  }
}
