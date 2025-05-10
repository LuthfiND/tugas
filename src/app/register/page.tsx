"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function SignupPage() {
  const router = useRouter()
  const [fullName, setFullName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [referral, setReferral] = useState("")
  const [loading, setLoading] = useState(false)

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      console.log({ fullName, email, password, referral })
      alert("Pendaftaran berhasil!")
      router.push("/login")
    } catch (error) {
      console.error(error)
      alert("Terjadi kesalahan saat mendaftar")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen grid grid-cols-1 md:grid-cols-2">
      {/* Kiri: Form Register */}
      <div className="flex items-center justify-center p-8 bg-white">
        <div className="w-full max-w-sm space-y-6">
          <div className="text-3xl font-bold text-center">Register</div>
          <form onSubmit={handleSignup} className="space-y-4">
            <div>
              <Label htmlFor="fullName">Full Name</Label>
              <Input
                id="fullName"
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required
              />
            </div>
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
            </div>
            <div>
              <Label htmlFor="referral">Referral Code (optional)</Label>
              <Input
                id="referral"
                type="text"
                value={referral}
                onChange={(e) => setReferral(e.target.value)}
              />
            </div>
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Loading..." : "Sign Up"}
            </Button>
          </form>
          <div className="text-center text-sm">
            Sudah punya akun?{" "}
            <Link href="/login" className="text-blue-600 hover:underline">
              Login
            </Link>
          </div>
        </div>
      </div>

      {/* Kanan: Gambar */}
      <div className="hidden md:block relative">
        <Image
          src="/bglogin2.jpg" // Ganti sesuai nama file gambar kamu
          alt="Signup illustration"
          fill
          className="object-cover"
        />
      </div>
    </div>
  )
}
