"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useDispatch } from "react-redux"
import { AppDispatch } from "@/lib/store"
import { loginUser } from "@/store/slices/AuthSlice"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  
  const dispatch = useDispatch<AppDispatch>();

  const router = useRouter()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    // setLoading(true)
  
    // try {
    //   const res = await fetch("http://localhost:8000/api/auth/login", {
    //     method: "POST",
    //     headers: { "Content-Type": "application/json" },
    //     body: JSON.stringify({ email, password }),
    //   })
  
    //   if (!res.ok) {
    //     const data = await res.json()
    //     throw new Error(data?.message || "Login gagal")
    //   }
  
    //   const data = await res.json()
    //   // Simpan token kalau ada
    //   localStorage.setItem("token", data.token)
  
    //   router.push("/")
    // } catch (error: any) {
    //   alert(error.message)
    // } finally {
    //   setLoading(false)
    // }
    const user = {
      email,
      password
    }
    dispatch(loginUser(user))
    router.push('/')
  }
  return (
    <div className="min-h-screen grid grid-cols-1 md:grid-cols-2">
      {/* Kiri: Form Login */}
      <div className="flex items-center justify-center p-8 bg-white">
        <div className="w-full max-w-sm space-y-6">
          <div className="text-3xl font-bold text-center">Login</div>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div>
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <div className="text-right mt-1">
                <Link href="/forgot-password" className="text-sm text-blue-600 hover:underline">
                  Forgot password?
                </Link>
              </div>
            </div>
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Loading..." : "Login"}
            </Button>
          </form>
          <div className="text-center text-sm">
            Belum punya akun?{" "}
            <Link href="/register" className="text-blue-600 hover:underline">
              Sign Up
            </Link>
          </div>
        </div>
      </div>

      {/* Kanan: Gambar */}
      <div className="hidden md:block relative">
        <Image
          src="/bglogin2.jpg"
          alt="Login illustration"
          fill
          className="object-cover"
        />
      </div>
    </div>
  )
}
