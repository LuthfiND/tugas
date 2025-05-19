"use client";

import { usePathname } from "next/navigation";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import {
  isAuthenticatedUser,
  loadUserFromLocalStorage,
} from "@/store/slices/AuthSlice";
import NavbarPage from "@/components/layouts/Navbar";
import { useRouter } from "next/navigation";
import { AppDispatch } from "@/lib/store";
import { useAppSelector } from "@/store/hooks";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const authState = useAppSelector((state) => state.auth);

  useEffect(() => {
    dispatch(isAuthenticatedUser());
    dispatch(loadUserFromLocalStorage());
  }, [dispatch]);

  // Hide navbar on login/register page
  const hideNavbar = pathname === "/login" || pathname === "/register";

  return (
    <div className="min-h-screen flex flex-col bg-white">
      {!hideNavbar && <NavbarPage />}
      <main className="flex-1 w-full max-w-full px-2 md:px-8 mx-auto">
        {children}
      </main>
    </div>
  );
}
