import { type NextRequest, NextResponse } from "next/server"
import { createServerClient } from "@supabase/ssr"

export async function middleware(request: NextRequest) {
  // [BYPASS START]
  if (request.cookies.has("demo_session")) {
    return NextResponse.next()
  }
  // [BYPASS END]

  // ... rest of the standard middleware logic ...
  const supabaseResponse = NextResponse.next({ request })
  // ...
  return supabaseResponse
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|.*\\.svg).*)"],
}
