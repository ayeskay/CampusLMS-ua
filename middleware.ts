import { type NextRequest, NextResponse } from "next/server"
import { createServerClient } from "@supabase/ssr"

export async function middleware(request: NextRequest) {
  const supabaseResponse = NextResponse.next({
    request,
  })

  const supabase = createServerClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!, {
    cookies: {
      getAll() {
        return request.cookies.getAll()
      },
      setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value, options }) => {
          supabaseResponse.cookies.set(name, value, options)
        })
      },
    },
  })

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user && request.nextUrl.pathname.startsWith("/dashboard")) {
    return NextResponse.redirect(new URL("/login", request.url))
  }

  if (!user && request.nextUrl.pathname.startsWith("/admin")) {
    return NextResponse.redirect(new URL("/login", request.url))
  }

  if (!user && request.nextUrl.pathname.startsWith("/profile")) {
    return NextResponse.redirect(new URL("/login", request.url))
  }

  if (!user && request.nextUrl.pathname.startsWith("/notes")) {
    return NextResponse.redirect(new URL("/login", request.url))
  }

  if (!user && request.nextUrl.pathname.startsWith("/attendance")) {
    return NextResponse.redirect(new URL("/login", request.url))
  }

  if (!user && request.nextUrl.pathname.startsWith("/resources")) {
    return NextResponse.redirect(new URL("/login", request.url))
  }

  if (!user && request.nextUrl.pathname.startsWith("/schedule")) {
    return NextResponse.redirect(new URL("/login", request.url))
  }

  if (!user && request.nextUrl.pathname.startsWith("/upload-resource")) {
    return NextResponse.redirect(new URL("/login", request.url))
  }

  return supabaseResponse
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|.*\\.svg).*)"],
}
