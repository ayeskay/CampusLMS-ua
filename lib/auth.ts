export function getAuthToken(): string | null {
  if (typeof window === "undefined") return null
  return localStorage.getItem("authToken")
}

export function getUser() {
  if (typeof window === "undefined") return null
  const user = localStorage.getItem("user")
  return user ? JSON.parse(user) : null
}

export function logout() {
  if (typeof window === "undefined") return
  localStorage.removeItem("authToken")
  localStorage.removeItem("user")
}

export function isAuthenticated(): boolean {
  return !!getAuthToken()
}
